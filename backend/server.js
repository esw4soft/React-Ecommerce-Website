import express from 'express'
import data from './product.js'

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

// port 監聽
const port = process.env.PORT || 5001
app.listen(port, () => {
  console.log(`server run at http://localhost:${port}`)
})