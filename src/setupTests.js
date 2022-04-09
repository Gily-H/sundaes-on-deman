// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { server } from "./mocks/server";

// establish API mocking before all tests
// intercepts all network requests and directs them to the mock server instead
beforeAll(() => server.listen());

// reset request handlers before running the next test
afterEach(() => server.resetHandlers());

// cleanup after all tests are finished
afterAll(() => server.close());
