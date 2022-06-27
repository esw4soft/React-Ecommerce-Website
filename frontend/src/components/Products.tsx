import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
import { ProductDet } from '../types'

interface ProductsProps {
  product: ProductDet
}

function Products(props: ProductsProps) {
  const { product } = props

  return (
    <div key={product.numberk} className="product border m-4">
      <Link to={`/product/${product.slug}`}>
        <img className="w-full max-w-sm" src={logo} alt="product.name" />
      </Link>
      <div className="product-info p-4">
        <Link to={`/product/${product.slug}`}>
          <p>{product.name}</p>
        </Link>
        <p>{product.price}</p>
        <button>add to card</button>
      </div>
    </div>
  )
}

export default Products
