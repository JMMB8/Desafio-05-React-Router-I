import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Button, Container, Alert } from "react-bootstrap";
import usePizzaCart from "../hooks/usePizzaCart";

const CardPizza = ({ id, name, price, ingredients, img }) => {
  const [showNotification, setShowNotification] = useState(false);
  const { agregarCarrito } = usePizzaCart();

  const handleAddPizza = () => {
    const pizza = {
      id,
      name,
      price,
      img,
      quantity: 1,
    };
    agregarCarrito(pizza);
    setShowNotification(true);
  };
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const formattedPrice = price.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
  return (
    <Card className="h-100 custom-card">
      <Card.Img variant="top" src={img} alt={`Imagen de ${name}`} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <strong>Ingredientes:</strong>
          <ul>
            {ingredients.map((ingredient) => (
              <li key={ingredient}>🍕 {ingredient}</li>
            ))}
          </ul>
        </Card.Text>
        <Card.Text>
          <strong>Precio:</strong> {formattedPrice}
        </Card.Text>
        <Container fluid className="custom-btns">
          <Link to={`/pizza/${id}`}>
            <Button className="me-5"> 👀 Ver Más</Button>
          </Link>
          <Button className="me-5" onClick={handleAddPizza}>
            Añadir
          </Button>
        </Container>
        {showNotification && (
          <Alert variant="success" className="mt-3">
            ¡Pizza añadida al carrito!
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

CardPizza.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};

export default CardPizza;
