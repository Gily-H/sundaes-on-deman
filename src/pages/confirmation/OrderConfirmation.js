import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOrderDetails } from "../../contexts/orderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ orderPhaseHandler }) {
  // retrieve the function to reset the option and option count mappings
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((err) => setError(true));
  }, []);

  if (error) {
    return <AlertBanner />;
  }

  function handleClick() {
    resetOrder();
    orderPhaseHandler("in progress");
  }

  if (orderNumber) {
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
  } else {
    return <p>Loading</p>;
  }
}
