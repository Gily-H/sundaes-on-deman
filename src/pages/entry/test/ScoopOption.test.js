import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test("scoop input box turns red when given invalid input", () => {
  // we are only rendering one scoop option with fake info
  // we are not retrieving information from the server - not async
  render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()} />);

  // enter a negative value for input in a scoop option
  const vanillaInput = screen.getByRole("spinbutton");
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");

  // check if scoop input box turns red
  // class .is-invalid comes from react-bootstrap
  expect(vanillaInput).toHaveClass("is-invalid");

  // enter a decimal value for input in a scoop option
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  // enter a number that is too high for the scoop option
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "12");
  expect(vanillaInput).toHaveClass("is-invalid");

  // enter a valid number in the scoop option
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
