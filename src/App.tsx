import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/home/Home'
import Sobre from './page/sobre/Sobre';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/sobre' element={<Sobre/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App;