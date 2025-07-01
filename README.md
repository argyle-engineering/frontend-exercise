# 💳 Credit Card Checkout Form – React + TypeScript

![validation](validation.gif)

This project is a developer evaluation task: build a credit card form UI in **React + TypeScript** that validates input and simulates submission. All validation logic should be test-covered using **Vitest + React Testing Library**.

## 📦 Tech Stack

- React (with hooks)
- TypeScript
- Vite
- Vitest + React Testing Library
- Optional: Tailwind, Radix UI, Material UI, or any UI/styling library
- Optional: any other NPM package helping to implement functionality

---

## 🚀 Getting Started

### 1. Create the Project

```bash
npm create vite@latest credit-card-form --template react-ts
cd credit-card-form
npm install
```

### 2. Optional: Add Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js` and CSS entry file as needed.

### 3. Add Testing Tools (Vitest)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### 4. Configure Vitest

Edit `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
```

Create `src/setupTests.ts`:

```typescript
import "@testing-library/jest-dom";
```

⸻

## 🧩 Features to Build

Create a credit card form with these fields:

- Card Number: formatted and Luhn validated
- Name on Card
- Expiry Date: MM/YY format
- CVV: 3–4 digits

🧠 Required Behaviors

- All fields are required
- Show validation errors when input is invalid or empty
- Show loading indicator on form submission
- Reset form and display success message on submit
- Prevent invalid form submission

⸻

## ✅ User Stories to Cover with Tests

Write tests using Vitest and React Testing Library in src/components/CreditCardForm.test.tsx:

1. ✅ Shows error if any field is left empty
2. ✅ Validates card number using the Luhn algorithm
3. ✅ Validates name (no numbers/symbols)
4. ✅ Validates expiry date (format + future)
5. ✅ Validates CVV (3 or 4 digits only)
6. ✅ Successful form submission resets form and shows success

⸻

### 🌟 Bonus #1 – Custom Hook: useCard

Create a `useCard` hook in `src/hooks/useCard.ts` that manages all form logic and validation.

Exposed API:

```typescript
const {
  cardNumber,
  cardName,
  expiryDate,
  cvv,
  setCardNumber,
  setCardName,
  setExpiryDate,
  setCvv,
  isValidCardNumber,
  isValidCardName,
  isValidExpiryDate,
  isValidCVV,
  isFormValid,
  cardBrand,
  validateForm,
  submitForm,
  isSubmitting,
  resetForm,
} = useCard();
```

Hook Responsibilities:

- Store & validate all inputs
- Run Luhn check
- Detect card brand: Visa, MasterCard, AmEx, or Unknown
- Submit with simulated delay
- Reset form state

⸻

### 🌟 Bonus #2 – Card Brand Detection

Detect and display card brand using number prefixes:

- 4\*\*\*\* → Visa
- 51-55\*\*\*\* → MasterCard
- 34 / 37\*\*\*\* → American Express

⸻

## 📁 Suggested File Structure

```bash
src/
  components/
    CreditCardForm.tsx
    CreditCardForm.test.tsx
  hooks/
    useCard.ts
  utils/
    luhnValidator.ts
  setupTests.ts
```

⸻

### ✅ Run Tests

```bash
npx vitest
```

Run in watch mode:

```bash
npx vitest --watch
```

⸻

## 📋 Quality Checklist

- Modular, typed React components
- Validations implemented and tested
- Custom useCard hook for form logic
- All 6 user stories tested
- Bonus features implemented (card brand, custom hook)
- Mobile responsive layout
- Accessible inputs and error messages

⸻

This project scaffold is set up to help out, but any other set up works as long as the user stories are satisfied.  
If you have any questions, give us a ping!  
Good luck!
