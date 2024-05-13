There were some problems with `postcss` when trying to run the project as is. IDK why, I have no idea what dependency has that and why. A clean reinstall of deps helped, but altered the lock file.

# Solution

After giving this exercise a little bit of thought and since I'm currently reading [Grokking Algorithms](https://www.manning.com/books/grokking-algorithms), I 've elected to use a D&C algorithm to solve this.
* An AST based approach would probably be better suited, but the last time I've really delved deep into it was like 10 years ago. I would need to read up and brush up on the implementation. I'm happy to have a go at it if that's a required to pass to the latter stages of the process and you're willing to give me more time.
* I've elected to tokenize on the word boundaries (`<space>`)
* I've decided to divide along the periods. Which works well from the `thousand` and up, but leaves `hundred` a weird in-between nested period that needs to be handled recursively within the thousand periods. This is especially cumbersome when trying to generate good error messages without an AST.
* `twenty five hundred` works, which I find endearing and wanted to be the case. But so does `twenty five hundred thousand`, which is rarely spoken and not so much endearing. Changing this is trivial though, and would require to allow only a `DIGIT` to stand in front of a `hundred`

## Frontend Exercise

Currently, the app does not have any functionality, only the input element and a single paragraph with output. The goal is to cover the user stories list below:

- As a user, when I enter text "fifty four" to the input field, I want to see the text: "Output: 54"
- As a user, when I enter the text "two thousand and forty five" to the input field, I want to see the text: "Output: 2045"
- As a user, when I enter the text "three million one hundred thousand and ninety" to the input field, I want to see the text: "Output: 3100090"
- As a user, when I enter the text "asdasd" to the input field, I want to see the text: "Output: incorrect"
- As a user, when I enter the text "one one" to the input field, I want to see the text: "Output: incorrect"

The max number can be 999 999 999.
The minimum number is 0.

No need to create any CSS style. The focus should be on creating functionality that covers user stories above and adding unit tests to test it.

There is no need to install any new packages.

## To prepare the app for running

```bash
npm install
```

## To start the app

```bash
npm start
```

## To run the tests

```bash
npm test
```
