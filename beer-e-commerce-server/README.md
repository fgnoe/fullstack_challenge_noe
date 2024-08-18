# React Beer E-Commerce Challenge - Back-End

This is a very simple backend project built with Node.js and Express.
It provides two API endpoints for retrieving product information and stock prices.

## Requirements

* Node.js v20 or higher

## Installation

1. Install dependencies: `npm install`

## Running the Project

* Start the server: `node index.js`
* The server will be running on `http://localhost:3000`

## API Endpoints

### Get All Products

* **Endpoint:** `/api/products`
* **Method:** `GET`
* **Description:** Retrieves a list of all products.
* **Response:** An array of product objects.

### Get Stock Price

* **Endpoint:** `/api/stock-price/:sku`
* **Method:** `GET`
* **Description:** Retrieves the stock price for a specific product based on its SKU.
* **Parameters:**
    * `sku`: The SKU of the product.
* **Response:**
    * If the SKU is found: An object containing the stock price information.
    * If the SKU is not found: A 404 "not found" error.

## Example Usage

```bash
# Get all products
curl http://localhost:3000/api/products

# Get stock price for SKU '35678'
curl http://localhost:3000/api/stock-price/35678