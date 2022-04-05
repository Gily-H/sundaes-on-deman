import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("checkbox is unchecked by defailt and button is enabled by default", () => {
  render(<SummaryForm />);

  const termsCheckbox = screen.getByRole("checkbox", { name: "I agree to Terms and Conditions" });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });

  // expect checkbox to be unchecked
  expect(termsCheckbox).not.toBeChecked();

  // expect button to be enabled
  expect(confirmButton).toBeEnabled();
});
