import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";

import App from "./App";

const inputValueAndReturnOutput = (value) => {
  const input = screen.getByRole("textbox");

  fireEvent.change(input, { target: { value } });

  return screen.getByText(/Output:/).textContent;
}

describe("App", () => {
  describe('Returning proper numbers', () => {
    it('Should render 54', () => {
      render(<App />);

      act(() => {
        const output = inputValueAndReturnOutput('fifty four')

        expect(output).toEqual(`Output: 54`);
      });
    })

    it('Should render 2045', () => {
      render(<App />);

      act(() => {
        const output = inputValueAndReturnOutput('two thousand and forty five')

        expect(output).toEqual(`Output: 2045`);
      });
    })

    it('Should render 3100090', () => {
      render(<App />);

      act(() => {
        const output = inputValueAndReturnOutput('three million one hundred thousand and ninety')

        expect(output).toEqual(`Output: 3100090`);
      });
    })
  });

  describe('Returning "incorrect"', () => {
    it('Should render incorrect for asdasd', () => {
      render(<App />);

      act(() => {
        const output = inputValueAndReturnOutput('asdasd')

        expect(output).toEqual(`Output: incorrect`);
      });
    })

    it('Should render incorrect for one one', () => {
      render(<App />);

      act(() => {
        const output = inputValueAndReturnOutput('one one')

        expect(output).toEqual(`Output: incorrect`);
      });
    })

    it('Should render incorrect for fifty fifteen', () => {
      render(<App />);

      act(() => {
        const output = inputValueAndReturnOutput('fifty fifteen')

        expect(output).toEqual(`Output: incorrect`);
      });
    })

    it('Should render incorrect for fifteen fifty', () => {
      render(<App />);

      act(() => {
        const output = inputValueAndReturnOutput('fifteen fifty')

        expect(output).toEqual(`Output: incorrect`);
      });
    })
  });
});
