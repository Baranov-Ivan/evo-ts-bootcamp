import React from "react";
import { render } from "@testing-library/react";
import {StoreProvider} from "./modules/store";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(
    <StoreProvider>
      <App />
    </StoreProvider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
