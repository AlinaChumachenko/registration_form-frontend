import Footer from "@@/components/Footer";
import Header from "@@/components/Header";
// import Header from '../components/Header.js'

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col p-10'>
      <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className=''>
            <h1 className='text-textColor text-5xl font-black leading-22'>Welcome to Home page</h1>
              {/* <p className='text-textColor text-lg font-medium leading-22'>Register to continue</p> */}
          </div>
        </main>
      <Footer />
    </div>
  )
}