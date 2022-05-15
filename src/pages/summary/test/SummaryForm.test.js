import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
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

test("popover appears on hover and disappears when not hover", async () => {
  render(<SummaryForm />);

  // popover should be hidden by default
  const nullPopover = screen.queryByText("No ice cream will actually be delivered");
  expect(nullPopover).not.toBeInTheDocument();

  // popover should appear when hovering
  const termsAndConditions = screen.getByText("Terms and Conditions");
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText("No ice cream will actually be delivered");
  expect(popover).toBeInTheDocument();

  // popover should disappear when not hovering
  // popover disappearing happens asynchronously - tests will finish before popover disappears
  // need async await call - wait for popover to disappear before asserting
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText("No ice cream will actually be delivered")
  );
});
