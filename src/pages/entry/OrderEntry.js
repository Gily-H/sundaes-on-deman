import { useOrderDetails } from "../../contexts/orderDetails";
import Options from "./Options";

export default function OrderEntry({ orderPhaseHandler }) {
  const [orderDetails] = useOrderDetails();

  // cannot use the statement below - once a scoop is added to the map,
  // the scoop entry will stay in the map even if the count is 0
  // the map will not be empty again until it is reset
  /* const disableOrderButton = orderDetails.scoops.size === 0; */
  
  const disableOrderButton = orderDetails.totals.scoops === "$0.00";
  
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
      <button onClick={() => orderPhaseHandler("review")} disabled={disableOrderButton}>
        Order Sundae!
      </button>
    </div>
  );
}
