import userEvent from "@testing-library/user-event";

import { render, screen, waitFor } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops selected", async () => {
  // to use Context inside test, need to wrap component with Provider
  // user our own implementation of the render function that has a ContextProvider wrapper
  render(<Options optionType="scoops" />);

  // initial subtotal should start at $0.00
  // search for subtotal by text --> does not have a role
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false }); // partial match
  expect(scoopsSubtotal).toHaveTextContent("0.00"); // partial match

  // update the vanilla scoops to 1 and check the subtotal
  // async call to get the scoops data from the server
  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  userEvent.clear(vanillaInput); // best to clear input to avoid errors
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00"); // vanilla scoop costs $2.00

  // update the chocolate scoops by 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00"); // 1 vanilla + 2 chocolate (each $2)
});

test("Update toppings subtotal when toppings selected", async () => {
  render(<Options optionType="toppings" />);

  // initial toppings subtotal should start at $0.00
  // search toppings subtotal component by text -> does not have a role
  const toppingsSubtotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsSubtotal).toHaveTextContent("0.00"); // initial amount

  // select the Cherries topping by clicking on the Cherries checkbox
  // checkbox appears if there is a successful request to the mock server to retrieve the toppings
  // need to await the server response
  const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });

  // user event to click on the Cherries checkbox - should be checked
  userEvent.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();

  // toppings subtotal should equal $1.50 after checking the Cherries topping
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // Check another topping - M&Ms topping
  // checkbox appears if there is a successful request to the mock server to retrieve the toppings
  // need to await the server response
  const mAndMsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });

  // user event to click on M&Ms checkbox - should be checked
  userEvent.click(mAndMsCheckbox);
  expect(mAndMsCheckbox).toBeChecked();

  // toppings subtotal should equal $3.00 after checking the M&Ms topping
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // uncheck the Cherries topping
  userEvent.click(cherriesCheckbox);
  expect(cherriesCheckbox).not.toBeChecked();

  // toppings subtotal should equal $1.50 after unchecking the Cherries topping
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at zero", () => {
    render(<OrderEntry />);

    // using partial match only works on *byRole screen functions
    // instead use regex and role to find grand total component
    const grandTotal = screen.getByRole("heading", { name: /Grand Total: \$/i });

    // check grandTotal to start at zero
    expect(grandTotal).toHaveTextContent("0.00");
  });

  test("grand total updates properly if selecting scoop option first", async () => {
    // render both the scoops and toppings
    render(<OrderEntry />);

    // get grand total compoent
    const grandTotal = screen.getByRole("heading", { name: /Grand Total: \$/i });

    // wait for server response with scoops options
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
    
    // Increment the vanilla scoop by 1
    userEvent.clear(vanillaInput); // best to clear input to avoid errors
    userEvent.type(vanillaInput, "1");
    
    // grand total should equal $2.00 after adding 1 to Vanilla scoop
    expect(grandTotal).toHaveTextContent("2.00");

    // wait for server response with toppings options
    const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });

    // Select the Cherries topping by clicking the checkbox
    userEvent.click(cherriesCheckbox);
    expect(cherriesCheckbox).toBeChecked();

    // grand total should equal $3.50 after selecting cherries topping
    expect(grandTotal).toHaveTextContent("3.50");
  });
  
  test("grand total updates properly if selecting topping option first", async () => {
    render(<OrderEntry />);

    // get grand total compoent
    const grandTotal = screen.getByRole("heading", { name: /Grand Total: \$/i });

    // wait for server response with toppings options
    const hotFudgeCheckbox = await screen.findByRole("checkbox", { name: "Hot fudge" });

    // Select the Hot Fudge topping by clicking the checkbox
    userEvent.click(hotFudgeCheckbox);
    expect(hotFudgeCheckbox).toBeChecked();

    // grand total should equal $1.50 after adding Hot Fudge topping
    expect(grandTotal).toHaveTextContent("1.50");

    // wait for server response with scoops options
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });

    // Increment the vanilla scoop by 1
    userEvent.clear(vanillaInput); // best to clear input to avoid errors
    userEvent.type(vanillaInput, "1");

    // grand total should equal $3.50 after selecting cherries topping
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updates properly when removing an option", async () => {
    render(<OrderEntry />);

    // get grand total compoent
    const grandTotal = screen.getByRole("heading", { name: /Grand Total: \$/i });

    // wait for response from the server after making a request to the mock server for scoops and toppings
    const hotFudgeCheckbox = await screen.findByRole("checkbox", { name: "Hot fudge" });
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });

    // Select the Hot Fudge topping by clicking the checkbox
    userEvent.click(hotFudgeCheckbox);
    expect(hotFudgeCheckbox).toBeChecked();

    // grand total should equal $1.50 after adding Hot fudge topping
    expect(grandTotal).toHaveTextContent("1.50");

    // Increment the vanilla scoops by 2
    userEvent.clear(vanillaInput); // best to clear input to avoid errors
    userEvent.type(vanillaInput, "2");

    // grand total should equal $5.50 after adding 2 vanilla scoops
    expect(grandTotal).toHaveTextContent("5.50");

    // remove the Vanilla scoop from the order
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    // grand total should be equal to $3.50 after removing 1 vanilla scoop
    expect(grandTotal).toHaveTextContent("3.50");

    // uncheck the Hot fudge topping option
    userEvent.click(hotFudgeCheckbox);
    expect(hotFudgeCheckbox).not.toBeChecked();

    // grand total should equal $2.00 after unchecking the Hot fudge topping option
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
