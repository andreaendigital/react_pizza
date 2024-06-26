import { Route, Routes } from "react-router-dom";

// importar vistas
import Detalle from "./views/Detalle.jsx";
import Home from "./views/Home.jsx";
import Carro from "./views/Carro.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/pizzas/:id" element={<Detalle />} />
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carro />} />
      </Routes>
    </div>
  );
};
export default App;