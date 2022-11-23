import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";


import HomePage from './pages/HomePage';
import ListagemPage from './pages/ListagemPage';
import CadastroPage from './pages/CadastroPage';
import DetalhesPage from './pages/DetalhesPage';
import EditarPage from './pages/EditarPage';
import NavBar from "./components/NavBar";



function App() {

  const [showList, setShowList] = useState(false);
  //console.log(showList);
  return (
    <div className="App">
      <Toaster />
      <NavBar showList={showList} setShowList={setShowList}/>
      <Routes>
        <Route path={"/"} element={<HomePage showList={showList} setShowList={setShowList}/>} />
        <Route path="/new-item" element={<CadastroPage />} />
        <Route path="/items" element={<ListagemPage />} />
        <Route path="/item/editar/:idItem" element={<EditarPage />} />
        <Route path="/item/:idItem" element={<DetalhesPage />} />
      </Routes>
    </div>
  );
}

export default App;