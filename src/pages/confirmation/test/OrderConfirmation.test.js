import { render, screen } from "../../../test-utils/testing-library-utils.js";
import { server } from "../../../mocks/server";
import { rest } from "msw";

import OrderConfirmation from "../OrderConfirmation";

test("handles error for Order Confirmation POST route", async () => {
  // override default mock server handler for Order post request
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  // pass in a mock function as a prop to satisfy Component 
  // even though prop is not used in this particular test 
  // jest.fn() is a mock function that does nothing
  render(<OrderConfirmation orderPhaseHandler={jest.fn()} />);

  // async call - axios post request for Order
  // check if alert banner is present
  const alertBanner = await screen.findByRole("alert");

  expect(alertBanner).toHaveTextContent("An unexpected error occurred. Please try again later.");
});
