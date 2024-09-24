import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '../context/UserContext';
import Layout from '../components/Layout';
import '@@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </UserProvider>
  );
}



