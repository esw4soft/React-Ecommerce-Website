import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logo from '../../logo.svg'
import { Productdet } from '../../types'

const Homepagea = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('./api/products')
      setProducts(result.data)
    }
    fetchData()
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold underline">Featured Products</h1>
      <div className="products flex flex-wrap justify-center">
        {products.map((product: Productdet) => (
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
