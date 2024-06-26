import { createContext, useEffect, useState } from "react";

// Creación del context
export const PizzasContext = createContext();

// Provider con la fuente de datos
const PizzasProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [carro, setCarro] = useState([]);

  useEffect(() => {
    getPizzas();
  }, []);

  // Obtener las pizzas
  const getPizzas = async () => {
    const res = await fetch("/pizzas.json");
    const pizzas = await res.json();
    setPizzas(pizzas);
  };

  // Funciones para el carro
  function agregarCompra({ id, name, price, img }) {
    const producto = { id, name, price, img, count: 1 };
    const indicePizzas = carro.findIndex((pedido) => pedido.id === id); // Si la pizza existía devolvemos su posición, o si no devuelve -1.
    if (indicePizzas >= 0) {
      carro[indicePizzas].count++;
      setCarro([...carro]);
    } else {
      setCarro([...carro, producto]);
    }
  }
  console.log(carro);

  const sumarCantidad = (id) => {
    const nuevoCarrito = carro.map((pizza) =>
      pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza
    );
    setCarro(nuevoCarrito);
  };

  const restarCantidad = (id) => {
    const nuevoCarrito = carro
      .map((pizza) =>
        pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza
      )
      .filter((pizza) => pizza.count > 0);
    setCarro(nuevoCarrito);
  };

  const calcularTotal = () => {
    return carro.reduce(
      (total, pizza) => total + pizza.price * pizza.count,
      0
    );
  };

  return (
    <PizzasContext.Provider
      value={{
        pizzas,
        setPizzas,
        carro,
        setCarro,
        agregarCompra,
        sumarCantidad,
        restarCantidad,
        calcularTotal,
      }}
    >
      {children}
    </PizzasContext.Provider>
  );
};

export default PizzasProvider;
