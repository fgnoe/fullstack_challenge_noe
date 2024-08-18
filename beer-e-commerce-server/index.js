import products from './products.js';
import stockPrices from './stock-price.js';
import express from 'express';
import cors from 'cors';

const app = express()
app.use(cors())

const port = 3000

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/stock-price/:sku', (req, res) => {
    const sku = req.params.sku;
    const product = stockPrices[sku];
    if (!product) {
        res.status(404).send('not found')
    }
    res.json(product)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})