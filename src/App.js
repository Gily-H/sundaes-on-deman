import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import { OrderDetailsProvider } from "./contexts/orderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary Page and Entry page both need a provider */}
        <OrderEntry />
        <OrderSummary />
      </OrderDetailsProvider>
      {/* Confirmation page does not need a provider */}
    </Container>
  );
}

export default App;
