import React from 'react'
import './App.scss'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Homepagea from './views/homepage'
import Productpage from './views/product'

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/" className="font-bold">
            hollowmazon
          </Link>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/product/:slug" element={<Productpage />} />
            <Route path="/" element={<Homepagea />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
