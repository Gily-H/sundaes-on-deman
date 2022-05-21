import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOrderDetails } from "../../contexts/orderDetails";

export default function OrderConfirmation({ orderPhaseHandler }) {
  // retrieve the function to reset the option and option count mappings
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((err) => console.log(err));
  }, []);

  function handleClick() {
    resetOrder();
    orderPhaseHandler("in progress");
  }

  return (
    <div>
      <h2>Thank you!</h2>
      <p>Your order number is {orderNumber}</p>
      <p>
        <small>as per our terms and conditions, nothing will happen now</small>
      </p>
      <button onClick={handleClick}>Create new order</button>
    </div>
  );
}
