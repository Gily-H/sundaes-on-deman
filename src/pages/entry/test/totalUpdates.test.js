import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("update scoop subtotal when scoops selected", async () => {
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
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
