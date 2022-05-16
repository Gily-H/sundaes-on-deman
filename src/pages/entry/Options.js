import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";

import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants/index";
import { useOrderDetails } from "../../contexts/orderDetails";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  // context uses the value provided by the Context Provider via the 'value' attribute
  // context: [object 'Order': {optionCounts and totals}, setter for option counts in order object]
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((err) => setError(true));
  }, [optionType]);
 
  // display error banner if unable to retrieve options from server
  if (error) {
    return <AlertBanner />;
  }

  // component to display depending on option type passed in as a prop
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase(); // format option string name

  // map each option retrieved from server into separate Item components
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>${pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
