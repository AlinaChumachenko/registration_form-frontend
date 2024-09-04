
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { name, email, password } = req.body;
  
      
        if (!name || !email || !password) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
  
        console.log('Registration data:', { name, email, password });
  
        return res.status(200).json({ message: 'Registration successful' });
      } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }