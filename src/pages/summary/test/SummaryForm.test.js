import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

// must agree to terms and conditions to continue with confirming order
test("checkbox is unchecked by default and button is disabled by default", () => {
  render(<SummaryForm />);

  const termsCheckbox = screen.getByRole("checkbox", { name: "I agree to Terms and Conditions" });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });

  // expect checkbox to be unchecked
  expect(termsCheckbox).not.toBeChecked();

  // expect button to be enabled
  expect(confirmButton).toBeDisabled();
});


