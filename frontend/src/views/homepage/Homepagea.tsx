import React from 'react'
import { Link } from 'react-router-dom'
import data from '../../data/product'
import logo from '../../logo.svg'

const Homepagea = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Featured Products</h1>
      <div className="products flex flex-wrap justify-center">
        {data.products.map((product) => (
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
        ))}
      </div>
    </>
  )
}

export default Homepagea
