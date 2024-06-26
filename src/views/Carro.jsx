import { useContext } from "react";
import Navbar from "../components/Navbar";
import { PizzasContext } from "../context/PizzaProvider";
import { Button, Table, Image } from "react-bootstrap";
import { numeroTotal } from "../numeroTotal.js";

const Carro = () => {
  const { pizzas, carro, calcularTotal, sumarCantidad, restarCantidad } =
    useContext(PizzasContext);

  function pagar() {
    alert("Qué buena compra has hecho !!");
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card mb-3 px-3 estilos">
          <h4>Detalle de compra</h4>
          <div className="d-flex justify-content-center row g-0">
            <div className="cuerpoTabla col-md-6">
              <Table>
                <tbody>
                  {carro.map((pizza) => (
                    <tr key={pizza.id}>
                      <td>
                        <Image className="imgCard" src={pizza.img} thumbnail />
                      </td>
                      <td>
                        <h6>{pizza.name}</h6>
                      </td>
                      <td>
                        <h6>${numeroTotal(pizza.price)}</h6>
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => sumarCantidad(pizza.id)}
                        >
                          +
                        </Button>
                      </td>
                      <td>
                        <h4>{pizza.count}</h4>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => restarCantidad(pizza.id)}
                        >
                          -
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <h6>Total: ${numeroTotal(calcularTotal())}</h6>
            <div>
              <Button className="mb-3 px-3" onClick={pagar}>
                ¡Pago Ahora!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carro;