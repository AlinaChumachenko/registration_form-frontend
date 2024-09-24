import React, { useState, useEffect, useMemo } from "react";
import ExpenseCard from "./ExpenseCard";
import AddExpenseModal from "./AddExpenseModal";
import AddExpenseBtn from "./AddExpenseBtn";

// Функция для получения userId из токена
const getUserIdFromToken = (token) => {
  if (!token) return null;

  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Декодируем токен из Base64
  return decodedToken.id; // Извлекаем userId из токена
};

const AddExpense = ({ onExpensesUpdate }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);
  const [userId, setUserId] = useState(null);

  // Загружаем данные из localStorage при первой загрузке
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      const userIdFromToken = getUserIdFromToken(token);
      setUserId(userIdFromToken);

      if (userIdFromToken) {
        const savedExpenses = localStorage.getItem(`expenses_${userIdFromToken}`);
        if (savedExpenses) {
          setExpenses(JSON.parse(savedExpenses)); // Загружаем данные из localStorage
        } else {
          fetchExpenses(); // Если данных в localStorage нет, загружаем с сервера
        }
      }
    }
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_PATH}/api/expense/getExpenses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setExpenses(data);
      if (userId) {
        localStorage.setItem(`expenses_${userId}`, JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    const totalExpenses = expenses.reduce(
      (total, expense) => total + (isNaN(parseFloat(expense.amount)) ? 0 : parseFloat(expense.amount)),
      0
    );
    onExpensesUpdate(totalExpenses);
  }, [expenses, onExpensesUpdate]);

  // Функция для добавления нового расхода
  const handleAddExpense = async (newExpense) => {
    try {
      const token = localStorage.getItem('token'); // Получаем токен авторизации
      let response;
      
      if (editExpense !== null) {
        // Редактирование существующего расхода
        response = await fetch(`${process.env.NEXT_PUBLIC_PATH}/api/expense/updateExpense`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ id: editExpense._id, ...newExpense }),
        });
      } else {
        // Добавление нового расхода
        response = await fetch(`${process.env.NEXT_PUBLIC_PATH}/api/expense/addExpense`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(newExpense),
        });
      }

      const savedExpense = await response.json();
      if (response.ok) {
        let updatedExpenses;
        if (editExpense !== null) {
          updatedExpenses = expenses.map(expense => expense._id === savedExpense._id ? savedExpense : expense);
        } else {
          updatedExpenses = [...expenses, savedExpense];
        }

        setExpenses(updatedExpenses); // Обновляем состояние
        localStorage.setItem(`expenses_${userId}`, JSON.stringify(updatedExpenses)); // Обновляем localStorage отдельно для каждого пользователя
        setIsOpenModal(false);
        setEditExpense(null);
      } else {
        console.error('Error saving expense:', savedExpense);
      }
    } catch (error) {
      console.error('Error in handleAddExpense:', error);
    }
  };

  // Функция для редактирования расхода
  const handleEdit = (index) => {
    setEditExpense({ ...expenses[index], index });
    setIsOpenModal(true);
  };

  // Функция для удаления расхода
  const handleDelete = async (index) => {
    const expenseToDelete = expenses[index];
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_PATH}/api/expense/deleteExpense`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ id: expenseToDelete._id }),
      });

      if (response.ok) {
        const updatedExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(updatedExpenses); // Обновляем состояние
        localStorage.setItem(`expenses_${userId}`, JSON.stringify(updatedExpenses)); // Обновляем localStorage отдельно для каждого пользователя
      } else {
        const errorData = await response.json();
        console.error('Error deleting expense:', errorData.message);
      }
    } catch (error) {
      console.error('Error in handleDelete:', error);
    }
  };

  // Расчёт общей суммы расходов с помощью useMemo
  const totalExpenses = useMemo(() => {
    return expenses.reduce(
      (total, expense) => total + (isNaN(parseFloat(expense.amount)) ? 0 : parseFloat(expense.amount)),
      0
    );
  }, [expenses]);

  return (
    <div>
      <div className="mb-4 text-lg font-semibold">
        Total Expenses: ${totalExpenses.toFixed(2)}
      </div>
      <AddExpenseBtn onClick={() => setIsOpenModal(true)} />
      <AddExpenseModal
        isOpenModal={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        handleSubmit={handleAddExpense}
        editExpense={editExpense}
      />
      <div className="mt-6">
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              onDelete={() => handleDelete(index)}
              onEdit={() => handleEdit(index)}
            />
          ))
        ) : (
          <p>No expenses added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddExpense;
