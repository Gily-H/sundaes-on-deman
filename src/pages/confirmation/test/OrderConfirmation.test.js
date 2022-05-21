import { render } from "../../../test-utils/testing-library-utils.js";
import { screen } from "@testing-library/react";
import { server } from "../../../mocks/server";
import { rest } from "msw";

import OrderConfirmation from "../OrderConfirmation";

test("handles error for Order Confirmation POST route", async () => {
  // create new mock handler for Order post request
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  // render the order confirmation component
  render(<OrderConfirmation />);

  // async call - axios post request for Order
  // check if alert banner is present
  const alertBanner = await screen.findByRole("alert");

  expect(alertBanner).toHaveTextContent("An unexpected error occurred. Please try again later.")
});
