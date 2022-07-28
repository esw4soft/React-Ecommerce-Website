import express from 'express'
import data from './product.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db')
}).catch((err) => {
    console.log(err.message)
})

const app = express()

// 資料寫入資料庫
app.use('/api/seed', seedRouter)

// 所有產品
app.use('/api/products', productRouter)

// port 監聽
const port = process.env.PORT || 5001
app.listen(port, () => {
  console.log(`server run at http://localhost:${port}`)
})