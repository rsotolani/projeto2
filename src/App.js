import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import ListagemPage from './pages/ListagemPage';
import CadastroPage from './pages/CadastroPage';
import DetalhesPage from './pages/DetalhesPage';
import EditarPage from './pages/EditarPage';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path="/new-item" element={<CadastroPage />} />
        <Route path="/items" element={<ListagemPage />} />
        <Route path="/item/editar/:idItem" element={<EditarPage />} />
        <Route path={"/item/:idItem"} element={<DetalhesPage />} />
      </Routes>
    </div>
  );
}

export default App;