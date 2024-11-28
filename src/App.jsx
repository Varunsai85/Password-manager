import './App.css'
import Content from './components/Content'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <div className='px-8 py-4'>
        <Navbar />
        <Content />
      </div>
        <Footer />
    </>
  )
}

export default App
