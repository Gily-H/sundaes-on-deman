import { render, screen } from "@testing-library/react";
import Options from "../Options";
import ScoopOption from "../ScoopOption";

test("displays image for each scoop option from the server", async () => {
  render(<Options optionType="scoops" />);

  // find images - getAllByRole collects all images
  // find images by name where name is the alt text
  // regex /scoop$/ == scoop is at the end of the expression
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2); // 2 from custom handler

  // confirm all text of images
  const altText = scoopImages.map((element) => element.alt);

  // primitives can use .toBe
  // arrays and objects need to use .toEqual
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
