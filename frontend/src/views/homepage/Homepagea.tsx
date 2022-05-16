import React from 'react'
import data from '../../data/product'
import logo from '../../logo.svg'

const Homepagea = () => {
  return (
    <>
      <header>
        <a className="font-bold" href="/">
          hollowmazon
        </a>
      </header>
      <main className="p-4">
        <h1 className="text-6xl font-bold underline">Featured Products</h1>
        <div className="products flex flex-wrap justify-center">
          {data.products.map((product) => (
            <div key={product.numberk} className="product border m-4">
              <a href={`/product/${product.slug}`}>
                <img
                  className="w-full max-w-sm"
                  src={logo}
                  alt="product.name"
                />
              </a>
              <div className="product-info p-4">
                <a href={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </a>
                <p>{product.price}</p>
                <button>add to card</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Homepagea
