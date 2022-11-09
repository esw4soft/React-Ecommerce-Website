import React, { useContext, useReducer, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import { Loadingcpm, Messagecpm } from '../../components'
import { ShowOrderReducerState, GetProduct } from '../../types'
import { Store } from '../../Store'
import { getError } from '../../utils'

// reducer function
const reducer = (state: ShowOrderReducerState, action: GetProduct) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

function ShowOrderPage() {
  const { state } = useContext(Store)
  const { userInfo } = state

  const params = useParams()
  const { id: orderId } = params
  const navigate = useNavigate()

  const hint: ShowOrderReducerState = {
    loading: true,
    order: {},
    error: '',
  }
  const [{ loading, error, order }, dispatch] = useReducer(reducer, hint)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })

        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `knight ${userInfo.token}` },
        })

        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }

    if (!userInfo) {
      return navigate('/signin')
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder()
    }
  }, [order, userInfo, orderId, navigate])

  return loading ? (
    <Loadingcpm></Loadingcpm>
  ) : error ? (
    <Messagecpm msgcode={0}>{error}</Messagecpm>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="text-center text-xl sm:text-left sm:text-[1.875rem]">
        Order {orderId}
      </h1>
    </div>
  )
}

export default ShowOrderPage
