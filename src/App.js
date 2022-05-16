import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider, useOrderDetails } from "./contexts/orderDetails";
import SummaryForm from "./pages/summary/SummaryForm";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary Page and Entry page both need a provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* Confirmation page does not need a provider */}
      <SummaryForm/>
    </Container>
  );
}

export default App;
