import { UserProvider } from '../context/UserContext';
import Layout from '../components/Layout';
import '@@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

// import { UserProvider } from '../context/UserContext';
// import "@@/styles/globals.css";

// export default function App({ Component, pageProps }) {
//   return (
//     <>
//     <UserProvider>
//       <Component {...pageProps} />
//     </UserProvider>
//     </>
//   );
// }




