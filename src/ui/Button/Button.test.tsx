import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "./Button";

test("Should render component Button without errors", () => {
  render(<Button onClick={() => {}} text="" variant="" />);

  const button = screen.getByRole("button");
  expect(button).toBeTruthy();
});

test("Should render component Button with text on it", () => {
  render(<Button onClick={() => {}} text="Export to PNG" variant="" />);

  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("Export to PNG");
});

test("Should render component Button with variant primary", () => {
  render(<Button onClick={() => {}} text="Export to PNG" variant="primary" />);

  const button = screen.getByRole("button");
  expect(button).toHaveClass("bg-[#7209B7]");
});

test("Should call onClick when button is clicked", () => {
  const handleClick = jest.fn();
  render(
    <Button onClick={handleClick} text="Export to PNG" variant="primary" />,
  );

  const button = screen.getByText("Export to PNG");
  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
