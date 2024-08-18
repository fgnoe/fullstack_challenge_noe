# React Beer E-Commerce Challenge - Front-End

This is the front-end part of the React Beer E-Commerce Challenge. It implements a mobile-first web application featuring a Productt Listing Page (PLP) and a Productt Details Page (PDP) for browsing and viewing beer products.

## Features

* **Mobile-First Design:** The app is designed primarily for mobile devices, following the visual specifications provided in the Figma file.
* **PLP (Productt Listing Page):** Displays a list of beer products with images, names, and breweries.
* **PDP (Productt Details Page):** Shows detailed information for a selected product, including price and inventory for different size variants.
* **Dynamic Updates:** The PDP fetches updated stock and price information every 5 seconds.
* **Error Handling:** User-friendly error messages are displayed using `window.alert()`.
* **Backend Integration:** Fetches product and stock data from a separate backend server.

## Requirements

* Node.js v20 or higher

## Installation

1. Install dependencies: `npm install`

## Running the App

1. Make sure the backend server is running. (See instructions in the backend README.md)
2. Start the development server: `npm run dev`
3. To test locally, you can use a "mobile" device, open the Chrome's device emulation:
    * Open Google Chrome.
    * Navigate to `http://localhost:5173` (or the port specified in your terminal).
    * Press `Ctrl+Shift+I` (or `Cmd+Option+I` on Mac) to open the developer tools.
    * Click the "Toggle device toolbar" button (it looks like a phone and tablet icon) in the top left corner of the developer tools.
    * Select a mobile device preset from the dropdown or customize the dimensions to simulate a mobile screen.
    * You might need to refresh the page after enabling device emulation.

## Important Notes

* **Mobile-Only:** The app is designed for mobile devices. On desktop browsers, it will display a message indicating it's a mobile web app.
* **Backend Required:** The app relies on a separate backend server for data.

## Project Structure

* `src/components`: Reusable React components.
* `src/routes`: PLP and PDP components.
* `src/App.jsx`: Main application component handling routing.

## Additional Information

* The visual design is based on the provided Figma file.
* The backend server handles product and stock data.
