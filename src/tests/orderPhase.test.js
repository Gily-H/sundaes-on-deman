import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

// happy path = application flow without errors
test("order phases for happy path", async () => {
  // render App component
  render(<App />);

  // should start at Order Entry page
  // add an ice cream scoop and add a topping
  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
  userEvent.click(cherriesCheckbox);

  // find and click order button - should transition to Summary page
  const orderButton = screen.getByRole("button", { name: "Order Sundae!" });
  userEvent.click(orderButton);

  // check order summary information based on order
  const scoopsSummary = screen.getByText("Scoops: $", { exact: false });
  expect(scoopsSummary).toHaveTextContent("2.00");

  const toppingsSummary = screen.getByText("Toppings: $", { exact: false });
  expect(toppingsSummary).toHaveTextContent("1.50");

  const totalSummary = screen.getByText("Total $", { exact: false });
  expect(totalSummary).toHaveTextContent("3.50");

  // accept terms and conditions and click button to confirm order
  // should transition to Confirmation page
  const termsAndCondBox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  userEvent.click(termsAndCondBox);

  const confirmOrderButton = screen.getByRole("button", { name: "Confirm Order" });
  userEvent.click(confirmOrderButton);

  // confirm order number on confirmation page
  const orderNumber = screen.getByText("Your order number is", { exact: false });
  expect(orderNumber).toHaveTextContent("123456789"); // number from mock handler

  // click the Create New Order button on the confirmation page
  const newOrderButton = screen.getByRole("button", { name: "Create new order" });
  userEvent.click(newOrderButton);

  // check that scoop and toppings subtotals have been reset
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const toppingsSubtotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsSubtotal).toHaveTextContent("0.00");
});
