import React from 'react';
import { useParams } from 'react-router-dom';

const productData = {
  1: { name: "Burger", price: "$5", description: "A delicious beef burger.", image: "burger.jpg" },
  2: { name: "Pizza", price: "$8", description: "Cheesy pizza with fresh toppings.", image: "pizza.jpg" }
};

function ProductDetails() {
  const { id } = useParams();
  const product = productData[id];

  return (
    <div className="container mt-5">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>Price:</strong> {product.price}</p>
      <button className="btn btn-success">Add to Cart</button>
    </div>
  );
}

export default ProductDetails;
