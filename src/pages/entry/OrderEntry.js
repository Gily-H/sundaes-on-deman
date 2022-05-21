import { useOrderDetails } from "../../contexts/orderDetails";
import Options from "./Options";

export default function OrderEntry({ orderPhaseHandler }) {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
      <button onClick={() => orderPhaseHandler("review")}>Order Sundae!</button>
    </div>
  );
}
