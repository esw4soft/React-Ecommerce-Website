import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

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

// paypal client keys
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

// 資料寫入資料庫
app.use('/api/seed', seedRouter)

// 所有產品
app.use('/api/products', productRouter)

// 登入
app.use('/api/users', userRouter)

// 訂單送出
app.use('/api/orders', orderRouter)

// 接上server所需path路徑
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '/frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/frontend/build/index.html')))

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message})
})

// port 監聽
const port = process.env.PORT || 5001
app.listen(port, () => {
  console.log(`server run at http://localhost:${port}`)
})