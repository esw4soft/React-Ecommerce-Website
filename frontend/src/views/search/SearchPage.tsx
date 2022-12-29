import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loadingcpm, Messagecpm, Rating } from '../../components'
import { getError } from '../../utils'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_REQUEST': {
      return { ...state, loading: true }
    }

    case 'FETCH_SUCCESS': {
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      }
    }

    case 'FETCH_FAIL': {
      return { ...state, loading: false, error: action.payload }
    }

    default:
      return state
  }
}

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
]

export const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },
  {
    name: '3stars & up',
    rating: 3,
  },
  {
    name: '2stars & up',
    rating: 2,
  },
  {
    name: '1stars & up',
    rating: 1,
  },
]

const SearchPage = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const sp = new URLSearchParams(search) // sp(search params)  , /search?category=shoes
  const category = sp.get('category') || 'all'
  const query = sp.get('query') || 'all'
  const price = sp.get('price') || 'all'
  const rating = sp.get('rating') || 'all'
  const order = sp.get('order') || 'newest'
  const page = sp.get('page') || 1

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        )
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
      }
    }
    fetchData()
  }, [category, error, order, page, price, query, rating])

  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`)
        setCategories(data)
      } catch (err) {
        toast.error(getError(err))
      }
    }
    fetchCategories()
  }, [dispatch])

  const getFilterUrl = (filter: any) => {
    const filterPage = filter.page || page
    const filterCategory = filter.category || category
    const filterQuery = filter.query || query
    const filterRating = filter.rating || rating
    const filterPrice = filter.price || price
    const filterOrder = filter.order || order
    return `/search?page=${filterPage}&query=${filterQuery}&category=${filterCategory}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}`
  }

  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>

      <div className="grid grid-cols-4">
        <h3>Department</h3>
        <ul>
          <li>
            <Link
              to={getFilterUrl({ category: 'all' })}
              className={'all' === category ? 'font-bold' : ''}
            >
              Any
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c}>
              <Link
                className={c === category ? 'font-bold' : ''}
                to={getFilterUrl({ category: c })}
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-4">
        <h3>Price</h3>
        <ul>
          <li>
            <Link
              to={getFilterUrl({ price: 'all' })}
              className={'all' === price ? 'font-bold' : ''}
            >
              Any
            </Link>
          </li>
          {prices.map((p) => (
            <li key={p.value}>
              <Link
                className={p.value === price ? 'font-bold' : ''}
                to={getFilterUrl({ price: p.value })}
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-4">
        <h3>Avg Customer Review</h3>
        <ul>
          {ratings.map((r) => (
            <li key={r.name}>
              <Link
                className={`${r.rating}` === `${rating}` ? 'font-bold' : ''}
                to={getFilterUrl({ rating: r.rating })}
              >
                <Rating caption={' & up'} rating={r.rating}></Rating>
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={getFilterUrl({ rating: 'all' })}
              className={rating === 'all' ? 'font-bold' : ''}
            >
              <Rating caption={' & up'} rating={0}></Rating>
            </Link>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-9">
        {loading ? (
          <Loadingcpm></Loadingcpm>
        ) : error ? (
          <Messagecpm msgcode={0}>{error}</Messagecpm>
        ) : (
          <>
            <div className="grid grid-cols-6">
              <div>
                {countProducts === 0 ? 'no' : countProducts} Results
                {query !== 'all' && ' : ' + query}
                {category !== 'all' && ' : ' + category}
                {price !== 'all' && ' : Price' + price}
                {rating !== 'all' && ' : Rating' + rating + ' & up'}
                {query !== 'all' ||
                  category !== 'all' ||
                  price !== 'all' ||
                  rating !== 'all' ? (
                  <div onClick={() => navigate('/search')}>
                    <i className="fas fa-times-circle"></i>
                  </div>
                ) : null}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SearchPage
