import SummaryForm from "../summary/SummaryForm.js";
import { useOrderDetails } from "../../contexts/orderDetails.js";

export default function OrderSummary() {
  const [orderDetails] = useOrderDetails();

  // get a list of scoops
  // entries() returns: entryIndex, [key, value]
  // key = option name, value = option count
  const scoopsArray = Array.from(orderDetails.scoops.entries());
  const scoopsList = scoopsArray.map(([key, value]) => {
    return <li key={key}>{`${value} ${key}`}</li>;
  });

  // get a list of toppings
  // only need the names of the toppings (keys)
  const toppingsArray = Array.from(orderDetails.toppings.keys());
  let toppingsDisplay = null;

  // display topping summary IFF at least one topping is selected
  if (toppingsArray.length) {
    const toppingsList = toppingsArray.map((key) => <li key={key}>{`${key}`}</li>);
    toppingsDisplay = (
      <>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>{toppingsList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopsList}</ul>
      {toppingsDisplay}
      <h2>Total {orderDetails.totals.grandTotal}</h2>
      <SummaryForm />
    </div>
  );
}
