// adiciona os matchers do jest-dom (toBeInTheDocument, toHaveClass, ...)
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
