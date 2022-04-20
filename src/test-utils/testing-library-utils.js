import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/orderDetails";

// ui: any component that you want to render
const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything from testing-library
export * from "@testing-library/react";

// override testing-library render method with our custom render
export { renderWithContext as render };
