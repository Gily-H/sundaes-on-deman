import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";

// intentionally left out default value for createContext
// want to check if null when not inside a Provider
const OrderDetails = createContext();

// create custom hook to check if context wrapped in Provider
// if wrapped, return context, otherwise throw error
function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error("useOrderDetails must be used within an OrderDetailsProvider");
  }

  return context;
}

// helper function to calculate subtotal based on option quantity selected
// params: optionType: string
//         optionCounts: object with maps for each option type
function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
}

function OrderDetailesProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(), // key = specific option name (e.g vanilla), value = count for key option
    toppings: new Map(), // key = specific option name (e.g M&Ms), value = count for key option
  });
  const [totals, setTotals] = useState({
    // subtotals and grand total
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  // update subtotals and grand totals when selected option counts are changed by user
  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal, // shortcut will use variable name as the key
    });
  }, [optionCounts]);

  // Provider value memoized
  // returns: array[2]
  //          object with option counts, subtotals/totals,
  //          setter function to update the selected option counts
  const value = useMemo(() => {
    // setter function: update the option counts
    function updateItemCount(itemName, newItemCount, optionType) {
      setOptionCounts((prevOptionCounts) => {
        // create new Map to avoid same reference issues for corresponding option type Map
        // changes in the new Map will not mutate values in the previous state's Map
        const newOptionsCountMap = new Map(prevOptionCounts[optionType]);
        // update option count with the new item count for specific item in the new Map 
        newOptionsCountMap.set(itemName, parseInt(newItemCount)); // count is type string - convert to int
        // new count object with previous counts, replace the optionType Map with the newly updated option count Map
        const newOptionsCount = {
          ...prevOptionCounts,
          [optionType]: newOptionsCountMap,
        };
        return newOptionsCount; // set the state with the new option count object
      });
    }
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]); // memo dependencies - recalculate value when dependencies change

  // value to be used by consumer components nested in the Provider
  return <OrderDetails.Provider value={value} {...props} />;
}

// export Provider and Context
export { OrderDetailesProvider, useOrderDetails };
