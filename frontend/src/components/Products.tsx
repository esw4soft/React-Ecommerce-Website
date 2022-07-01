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
      className="product border m-4 bg-white rounded-lg border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
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
        <button className='className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"'>
          add to cart
        </button>
      </div>
    </div>
  )
}

export default Products
