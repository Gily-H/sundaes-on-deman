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

  // await keyword not necessary if we know that the Vanilla input exists
  const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
  userEvent.click(cherriesCheckbox);

  // find and click order button - should transition to Summary page
  const orderButton = screen.getByRole("button", { name: /order sundae!/i });
  userEvent.click(orderButton);

  // check order summary information based on order
  const summaryHeader = screen.getByRole("heading", { name: /order summary/i });
  expect(summaryHeader).toBeInTheDocument();

  const scoopsSummary = screen.getByText("Scoops: $", { exact: false });
  expect(scoopsSummary).toHaveTextContent("6.00");

  const toppingsSummary = screen.getByText("Toppings: $", { exact: false });
  expect(toppingsSummary).toHaveTextContent("1.50");

  // check list items
  const optionItems = screen.getAllByRole("listitem");
  const optionItemsText = optionItems.map((optionItem) => optionItem.textContent);
  expect(optionItemsText).toEqual(["1 Vanilla", "2 Chocolate", "Cherries"]);

  const totalSummary = screen.getByText("Total $", { exact: false });
  expect(totalSummary).toHaveTextContent("7.50");

  // accept terms and conditions and click button to confirm order
  // should transition to Confirmation page
  const termsAndCondBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(termsAndCondBox);

  const confirmOrderButton = screen.getByRole("button", { name: /confirm order/i });
  userEvent.click(confirmOrderButton);

  // initially there will be a loading screen when waiting for axios call to resolve
  const loadingScreen = screen.getByText(/loading/i);
  expect(loadingScreen).toBeInTheDocument();

  // async call using axios - wait for response after sending POST request when confirming order
  // check the order confirmation page information
  const confirmationHeading = await screen.findByRole("heading", { name: /thank you/i });
  expect(confirmationHeading).toBeInTheDocument();

  // confirm order number on confirmation page
  const orderNumber = await screen.findByText("Your order number is ", { exact: false });
  expect(orderNumber).toHaveTextContent("123456789"); // number from mock handler

  // loading screen should not be visible after we get the thank you screen
  const noLoadingScreen = screen.queryByText(/loading/i);
  expect(noLoadingScreen).not.toBeInTheDocument();

  // click the Create New Order button on the confirmation page
  const newOrderButton = screen.getByRole("button", { name: /create new order/i });
  userEvent.click(newOrderButton);

  // check that scoop and toppings subtotals have been reset
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const toppingsSubtotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsSubtotal).toHaveTextContent("0.00");
});
