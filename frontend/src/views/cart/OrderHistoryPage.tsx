import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Loadingcpm, Messagecpm } from '../../components'
import { Store } from '../../Store'
import { OrderHistoryReducerState, GetProduct } from '../../types'
import { getError } from '../../utils'

const reducer = (state: OrderHistoryReducerState, action: GetProduct) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

const OrderHistoryPage = () => {
  const { state } = useContext(Store)
  const { userInfo } = state
  const navigate = useNavigate()

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const { data } = await axios.get(`api/orders/mine`, {
          headers: { Authorization: `knight ${userInfo.token}` },
        })
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
      }
    }
    fetchData()
  }, [userInfo])
  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1 className="text-center sm:text-left">歷史訂單</h1>
      {loading ? (
        <Loadingcpm></Loadingcpm>
      ) : error ? (
        <Messagecpm msgcode={0}>{error}</Messagecpm>
      ) : (
        <div className="p-5 sm:px-0">
          {orders.map((order: any) => (
            <ul key={order._id} className="mb-5 rounded border p-3">
              <li className="mb-1">
                <strong>ID :</strong>{' '}
                <span className="font-bold text-sky-800">{order._id}</span>
              </li>
              <li className="mb-1">
                <strong>日期 : </strong>
                <span className="font-bold text-sky-800">
                  {order.createdAt.substring(0, 10)}
                </span>
              </li>
              <li className="mb-1">
                <strong>總金額 : </strong>
                <span className="font-bold text-sky-800">
                  {order.totalPrice.toFixed(2)}
                </span>
              </li>
              <li className="mb-1">
                <strong>是否已支付 : </strong>
                <span className="font-bold text-sky-800">
                  {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                </span>
              </li>
              <li className="mb-1">
                <strong>是否已送達 : </strong>
                <span className="font-bold text-sky-800">
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </span>
              </li>
              <li className="mb-1">
                <strong>其他 : </strong>
                <button
                  type="button"
                  className="text-md ml-2 flex-grow rounded-lg bg-sky-800 px-2 py-1 font-medium text-white hover:bg-sky-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  onClick={() => {
                    navigate(`/order/${order._id}`)
                  }}
                >
                  詳細資訊
                </button>
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderHistoryPage
