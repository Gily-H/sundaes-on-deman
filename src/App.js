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

  let PageComponent = OrderEntry;
  switch (orderPhase) {
    case "in progress":
      PageComponent = OrderEntry;
      break;
    case "review":
      PageComponent = OrderSummary;
      break;
    case "completed":
      PageComponent = OrderConfirmation;
      break;
    default:
      break;
  }

  return (
    <Container>
      <OrderDetailsProvider>
        <PageComponent orderPhaseHandler={transitionOrderPhase} />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
