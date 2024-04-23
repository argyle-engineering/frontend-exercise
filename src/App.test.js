import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it("renders correctly", () => {
    render(<App />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("Output:")).toBeInTheDocument();
  });

  it(`should convert number to text`, () => {
    render(<App />);

    [
      {
        text: "fifty four",
        number: 54,
      },
      {
        text: "two thousand and forty five",
        number: 2045,
      },
      {
        text: "three million one hundred thousand and ninety",
        number: 3100090,
      },
      {
        text: "asdasd",
        number: "incorrect",
      },
      {
        text: "one one",
        number: "incorrect",
      },
      {
        text: "zero",
        number: 0,
      },
      {
        text: "thirteen million",
        number: 13_000_000,
      },
      {
        text: "ninety thirteen",
        number: "incorrect",
      },
      {
        text: "one million and three thousand",
        number: "incorrect",
      },
      {
        text: "nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine",
        number: 999_999_999,
      },
    ].forEach(({ text, number }) => {
      const input = screen.getByRole("textbox");

      act(() => {
        fireEvent.change(input, { target: { value: text } });

        const output = screen.getByText(/Output:/);
        jest.advanceTimersByTime(500);

        expect(output.textContent).toBe(`Output: ${number}`);
      });
    });
  });

  it(`should return "incorrect" for incorrect number`, () => {
    render(<App />);

    [
      {
        text: "asdasd",
      },
      {
        text: "one one",
      },
      {
        text: "ninety thirteen",
      },
      {
        text: "one million and three thousand",
      },
      {
        text: "hundred",
      },
      {
        text: "   ",
      },
    ].forEach(({ text }) => {
      const input = screen.getByRole("textbox");

      act(() => {
        fireEvent.change(input, { target: { value: text } });

        const output = screen.getByText(/Output:/);
        jest.advanceTimersByTime(500);

        expect(output.textContent).toBe(`Output: incorrect`);
      });
    });
  });

  it("should show the result after some time", () => {
    render(<App />);

    const input = screen.getByRole("textbox");

    const text = "one thousand fifty";

    act(() => {
      fireEvent.change(input, { target: { value: text } });

      const output = screen.getByText(/Output:/);
      expect(output.textContent.trim()).toBe(`Output:`);

      jest.advanceTimersByTime(500);

      expect(output.textContent).toBe(`Output: 1050`);
    });
  });
});
