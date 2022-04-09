import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// configure a request mocking server using Node passing in custom handlers
export const server = setupServer(...handlers);
