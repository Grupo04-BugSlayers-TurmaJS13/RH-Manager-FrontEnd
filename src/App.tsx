import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/home/Home';
import Sobre from './page/sobre/Sobre';
import Login from './page/login/Login';
import NotFound from './page/NotFound';
import NovoColaborador from './page/colaborador/NovoColaborador';
import DetalheColaborador from './page/colaborador/DetalheColaborador';
import ListarColaboradores from './component/colaborador/listarColaboradores/ListarColaboradores';
import Configuracoes from './page/configuracoes/Configuracoes';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ColaboradorProvider } from './context/ColaboradorContext';
import { ConfigProvider } from './context/ConfigContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ConfigProvider>
          <ColaboradorProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="/colaboradores" element={<ListarColaboradores />} />
                    <Route path="/colaboradores/:id" element={<DetalheColaborador />} />
                    <Route path="/colaboradores/novo" element={
                      <ProtectedRoute><NovoColaborador /></ProtectedRoute>
                    } />
                    <Route path="/configuracoes" element={
                      <ProtectedRoute><Configuracoes /></ProtectedRoute>
                    } />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </>
              } />
            </Routes>
          </ColaboradorProvider>
        </ConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;