import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./contexts/orderDetails";

function App() {
  const [orderPhase, setOrderPhase] = useState("in progress");

  // handler to be passed down to other components to transition order phases
  function transitionOrderPhase(phase) {
    setOrderPhase(phase);
  }

  let Item = OrderEntry;
  switch (orderPhase) {
    case "in progress":
      Item = OrderEntry;
      break;
    case "review":
      Item = OrderSummary;
      break;
    case "completed":
      Item = OrderConfirmation;
      break;
    default:
      break;
  }

  return (
    <Container>
      <OrderDetailsProvider>
        <Item orderPhaseHandler={transitionOrderPhase} />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
