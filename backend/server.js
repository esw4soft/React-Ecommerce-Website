import express from 'express'
import data from './product.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db')
}).catch((err) => {
    console.log(err.message)
})

const app = express()

// 所有產品
app.get('/api/products', (req, res) => {
  res.send(data.products)
})

// 單一產品
app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug)
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: 'Product Not Found' })
  }
  
})

// 購物車
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x.numberk === req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.status(404).send({ message: 'Product Not Found' })
  }
  
})

// port 監聽
const port = process.env.PORT || 5001
app.listen(port, () => {
  console.log(`server run at http://localhost:${port}`)
})