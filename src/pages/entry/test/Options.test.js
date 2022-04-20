import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("displays image for each scoop option from the server", async () => {
  render(<Options optionType="scoops" />);

  // retrieving scoop images involves requesting data from a server
  // tests will complete before mock request finishes and therefore tests will fail - requires async
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i }); // name is alt attr
  expect(scoopImages).toHaveLength(2); // 2 items hardcoded in custom handler

  // confirm all text of images
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
