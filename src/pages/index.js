import Footer from "@@/components/Footer";
import Header from "@@/components/Header";
// import Header from '../components/Header.js'

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col p-10'>
      <Header />
        {/* <main className="flex-grow flex items-center justify-center"> */}
          <div className='flex-grow flex items-center justify-center'>
            <h1 className='text-textColor text-5xl font-black leading-22'>Planning a family budget</h1>
              
          </div>
        {/* </main> */}
      <Footer />
    </div>
  )
}