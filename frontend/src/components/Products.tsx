import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
import { ProductDet } from '../types'
import Rating from '../components/Rating'

interface ProductsProps {
  product: ProductDet
}

function Products(props: ProductsProps) {
  const { product } = props

  return (
    <div
      key={product.numberk}
      className="product m-4 rounded-lg border border-gray-200 bg-white shadow-md"
    >
      <Link to={`/products/${product.slug}`}>
        <img className="w-full max-w-sm" src={logo} alt="product.name" />
      </Link>
      <div className="product-info p-4">
        <Link to={`/products/${product.slug}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          ${product.price}
        </p>
        <button className='className="inline-flex dark:focus:ring-blue-800" items-center rounded-lg bg-sky-500 py-2 px-3 text-center text-sm font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700'>
          add to cart
        </button>
      </div>
    </div>
  )
}

export default Products
