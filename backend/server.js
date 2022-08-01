import express from 'express'
import data from './product.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db')
}).catch((err) => {
    console.log(err.message)
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 資料寫入資料庫
app.use('/api/seed', seedRouter)

// 所有產品
app.use('/api/products', productRouter)

// 登入
app.use('/api/users', userRouter)

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message})
})

// port 監聽
const port = process.env.PORT || 5001
app.listen(port, () => {
  console.log(`server run at http://localhost:${port}`)
})