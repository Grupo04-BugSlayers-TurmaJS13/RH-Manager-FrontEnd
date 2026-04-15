import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/home/Home'
import Sobre from './page/sobre/Sobre';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/home" element={<Home />} />
          <Route path='/sobre' element={<Sobre/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )

}

export default App;