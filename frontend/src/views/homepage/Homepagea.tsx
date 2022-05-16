import React from 'react'
import data from '../../data/product'

const Homepagea = () => {
  return (
    <>
      <header>
        <a className="font-bold" href="/">
          hollowmazon
        </a>
      </header>
      <main>
        <h1 className="text-6xl font-bold underline">Featured Products</h1>
        <div className="products">
          {data.products.map((product) => (
            <div key={product.numberk} className="product">
              <img src="#" alt="product.name" />
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Homepagea
