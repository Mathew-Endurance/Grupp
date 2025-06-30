import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// Custom render function that includes router
export function renderWithRouter(
  ui: ReactElement,
  { route = "/", ...renderOptions }: { route?: string } & RenderOptions = {}
) {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
      ...renderOptions,
    }),
  };
}

export { screen, within, fireEvent, waitFor } from "@testing-library/react";
export { renderWithRouter as render };
