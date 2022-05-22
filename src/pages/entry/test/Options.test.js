import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("displays image for each scoop option from the server", async () => {
  render(<Options optionType="scoops" />);

  // retrieving scoop images involves requesting data from a server
  // tests will complete before mock request finishes and therefore tests will fail - requires async
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i }); // name is alt attr
  expect(scoopImages).toHaveLength(2); // 2 items hardcoded in custom handler

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);

  // primitives can use .toBe
  // arrays and objects need to use .toEqual
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each topping option from the server", async () => {
  render(<Options optionType="toppings" />);

  // retrieve topping images from the server through async test call
  const toppingImages = await screen.findAllByRole("img", { name: /topping$/i });
  expect(toppingImages).toHaveLength(3);

  // confirm images retrieved with correct alt text
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
});

test("scoop subtotal does not update when given invalid input", async () => {
  render(<Options optionType="scoops" />);

  // enter an invalid input in scoop option
  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-2");

  // check if scoop subtotal did not update
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // check if scoop subtotal did not update when given decimal input
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "3.3");
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // check if scoop subtotal did not update when given input that is too high
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "15");
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // check if scoop subtotal updated when given valid input
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "3");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});
