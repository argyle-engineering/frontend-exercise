import App from "./App";
import { render, screen, fireEvent } from "@testing-library/react";
// import 'jest-dom/extend-expect'
import "@testing-library/jest-dom";
// import userEvent from '@testing-library/user-event';
describe("App", () => {
  function setup() {
    render(<App />);
    return [screen.getByRole("textbox"), screen.getByRole("paragraph")];
  }

  it('should trim black spaces between input words', () => {
    const [input, p] = setup();
    fireEvent.change(input, { target: { value: "   one    hundred    and    two" } });
    expect(p).toHaveTextContent("Output: 102");
  });

  it('should not be case sensitive', () => {
    const [input, p] = setup();
    fireEvent.change(input, { target: { value: "TWENTY ONE" } });
    expect(p).toHaveTextContent("Output: 21");
  });

  it('should convert "zero" into 0', () => {
    const [input, p] = setup();
    fireEvent.change(input, { target: { value: "zero" } });
    expect(p).toHaveTextContent("Output: 0");
  });

  it('should convert "fifty four" into 54', () => {
    const [input, p] = setup();
    fireEvent.change(input, { target: { value: "fifty four" } });
    expect(p).toHaveTextContent("Output: 54");
  });

  it('should convert "two thousand and forty five" into 2045', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "two thousand and forty five" },
    });
    expect(p).toHaveTextContent("Output: 2045");
  });

  it('should convert "three million one hundred thousand and ninety" into 3100090', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "three million one hundred thousand and ninety" },
    });
    expect(p).toHaveTextContent("Output: 3100090");
  });

  it('should convert "nine hundred and ninety nine million nine hundred and ninety nine thousand and nine hundred and ninety nine" into 999999999', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: {
        value:
          "nine hundred and ninety nine million nine hundred and ninety nine thousand and nine hundred and ninety nine",
      },
    });
    expect(p).toHaveTextContent("Output: 999999999");
  });

  it('should convert "ten million" into 10000000', () => {
    const [input, p] = setup();
    fireEvent.change(input, { target: { value: "ten million" } });
    expect(p).toHaveTextContent("Output: 10000000");
  });

  it('should convert "eleven million" into 11000000', () => {
    const [input, p] = setup();
    fireEvent.change(input, { target: { value: "eleven million" } });
    expect(p).toHaveTextContent("Output: 11000000");
  });

  it('should display incorrect if first word is "hundred"', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "hundred and one" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if first word is "million"', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "million and one" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if first word is "thousand"', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "thousand and one" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if order between units and tens is not correct', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one thousand and one twenty" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if units are duplicated', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one thousand and one three" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });


  it('should display incorrect if tens are duplicated', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one thousand and twenty twenty" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if 11-19s are duplicated', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one million and fifteen fifteen" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if 11-19s and units are consecutive', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "fifteen three" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if hundred is duplicated', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one hundred hundred and three" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if thousand is duplicated', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one thousand thousand and three" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if million is duplicated', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one thousand thousand and three" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  // it('should display incorrect if million is duplicated', () => {
  //   const [input, p] = setup();
  //   fireEvent.change(input, {
  //     target: { value: "one thousand thousand and three" },
  //   });
  //   expect(p).toHaveTextContent("Output: incorrect");
  // });


  it('should display incorrect if order between million and thousands is not correct', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one thousand and one million" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });


  it('should display incorrect if typed words contain other words then numbers and "AND" word', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one hundred asdsf four" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });
  it('should not enforce "AND" word so "three million one hundred thousand ninety" should convert into 3100090', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "three million one hundred thousand and ninety" },
    });
    expect(p).toHaveTextContent("Output: 3100090");
  });

  it('should display incorrect if "AND" word is between hundreds and thousands', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one hundred and thousand" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if input contains word "zero"', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one thousand and one hundred and zero" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if "AND" word is between thousands and hundreds', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one thousand and hundred" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if "AND" word is between hundreds and millions', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one hundred and million" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if "AND" word is between millions and hundreds', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one million and hundred" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if "AND" word is between millions and thousands', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one million and thousand" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if "AND" word is the first word', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "and thousand" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display incorrect if "AND" word is the last word', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "thousand and" },
    });
    expect(p).toHaveTextContent("Output: incorrect");
  });

  it('should display correct number if "AND" word is between "thousand" and tens', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one thousand and ten" },
    });
    expect(p).toHaveTextContent("Output: 1010");
  });

  it('should display correct number if "AND" word is between "thousand" and units', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one thousand and two" },
    });
    expect(p).toHaveTextContent("Output: 1002");
  });

  it('should display correct number if "AND" word is between "million" and tens', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one million and fifty" },
    });
    expect(p).toHaveTextContent("Output: 1000050");
  });

  it('should display correct number if "AND" word is between "million" and units', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one million and five" },
    });
    expect(p).toHaveTextContent("Output: 1000005");
  });

  it('should display correct number if "AND" word is between "hundred" and tens', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one hundred and fifty" },
    });
    expect(p).toHaveTextContent("Output: 150");
  });

  it('should display correct number if "AND" word is between "hundred" and units', () => {
    const [input, p] = setup();
    fireEvent.change(input, {
      target: { value: "one hundred and five" },
    });
    expect(p).toHaveTextContent("Output: 105");
  });

});
