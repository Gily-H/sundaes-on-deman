import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

// must agree to terms and conditions to continue with confirming order
test("checkbox is unchecked by default and button is disabled by default", () => {
  render(<SummaryForm />);

  const termsCheckbox = screen.getByRole("checkbox", { name: "I agree to Terms and Conditions" });
  const confirmButton = screen.getByRole("button", { name: "Confirm Order" });

  // expect checkbox to be unchecked
  expect(termsCheckbox).not.toBeChecked();

  // expect button to be enabled
  expect(confirmButton).toBeDisabled();
});

test("enable button on first checkbox click and disable button on second checkbox click", () => {
  render(<SummaryForm />);

  const termsCheckbox = screen.getByRole("checkbox", { name: "I agree to Terms and Conditions" });
  const confirmButton = screen.getByRole("button", { name: "Confirm Order" });

  // first click on checkbox
  userEvent.click(termsCheckbox);

  // T&C checkbox should be checked
  expect(termsCheckbox).toBeChecked();

  // button should be enabled
  expect(confirmButton).toBeEnabled();

  // second click on checkbox
  userEvent.click(termsCheckbox);

  // T&C checkbox should be unchecked
  expect(termsCheckbox).not.toBeChecked();

  // button should be disabled
  expect(confirmButton).toBeDisabled();
});
