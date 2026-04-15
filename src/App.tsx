import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/home/Home'
import Sobre from './page/sobre/Sobre';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import ListarColaboradores from './component/colaborador/listarColaboradores/ListarColaboradores';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/home" element={<Home />} />
          <Route path='/sobre' element={<Sobre/>}/>
          <Route path='/colaboradores' element={<ListarColaboradores/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )

}

export default App;