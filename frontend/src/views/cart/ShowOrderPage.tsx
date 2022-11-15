import React, { useContext, useReducer, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {
  PayPalButtons,
  usePayPalScriptReducer,
  SCRIPT_LOADING_STATE,
} from '@paypal/react-paypal-js'
import { Helmet } from 'react-helmet-async'
import { Loadingcpm, Messagecpm } from '../../components'
import { ShowOrderReducerState, GetProduct } from '../../types'
import { Store } from '../../Store'
import { getError } from '../../utils'
import { CartDet } from '../../types'
import logo from '../../logo.svg'
import { toast } from 'react-toastify'

// reducer function
const reducer = (state: ShowOrderReducerState, action: GetProduct) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }

    case 'PAY_REQUEST':
      return { ...state, loadingPay: true }
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true }
    case 'PAY_FAIL':
      return { ...state, loadingPay: false }
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false }

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
    successPay: false,
    loadingPay: false,
  }

  // order reducer
  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, hint)

  // paypal reducer
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

  // create order
  function createOrder(data: any, actions: any) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID: any) => {
        return orderID
      })
  }

  // approve order
  function onApprove(data: any, actions: any) {
    return actions.order.capture().then(async function (details: any) {
      try {
        dispatch({ type: 'PAY_REQUEST' })
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `knight ${userInfo.token}` },
          }
        )

        dispatch({ type: 'PAY_SUCCESS', payload: data })
        toast.success('Order is paid')
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) })
        toast.error(getError(err))
      }
    })
  }

  function onError(err: any) {
    toast.error(getError(err))
  }

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

    // 沒有用戶資料(未登入)
    if (!userInfo) {
      return navigate('/signin')
    }
    // 沒有訂單/ 有付錢/ 有訂單但不是此筆
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder()
      if (successPay) {
        dispatch({ type: 'PAY_RESET' })
      }
    } else {
      //此筆訂單&沒付錢
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: { authorization: `knight ${userInfo.token}` },
        })
        // dispatch 狀態
        paypalDispatch({
          type: 'setLoadingStatus',
          value: SCRIPT_LOADING_STATE.PENDING, //導入套件裡面的常數
        })

        // dispatch 基本資料
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'TWD',
          },
        })
      }
      loadPaypalScript()
    }
  }, [order, userInfo, orderId, navigate, paypalDispatch])

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
      <div className="mt-4 grid grid-cols-3 gap-4 px-[2rem] sm:px-0">
        <div className="col-span-3 rounded-md p-[1rem] shadow-md sm:col-span-2">
          <div>
            <h2 className="mb-2 text-center font-bold sm:text-left sm:text-2xl">
              Shipping
            </h2>
            <div className="mb-6 text-center sm:text-left">
              <strong>Name:</strong> {order.shippingAddress.fullName} <br />
              <strong>Address:</strong> {order.shippingAddress.address},{' '}
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}{' '}
              {order.shippingAddress.ccountry}
            </div>
            {order.isDelivered ? (
              <Messagecpm msgcode={1}>
                Delivered at {order.deliveredAt}
              </Messagecpm>
            ) : (
              <Messagecpm msgcode={0}>Not Delivered</Messagecpm>
            )}
          </div>
        </div>

        <div className="col-span-3 sm:col-span-1">
          <div className="col-span-2 rounded-md p-[1rem] shadow-md sm:col-span-1 sm:border">
            <div className="flex justify-between px-3 py-2">
              <h2 className="m-auto font-bold sm:m-0">Order Summary</h2>
            </div>
            <div>
              <div className="flex border-b-2 py-2 px-5">
                <strong className="w-1/2">Items :</strong>
                <span className="w-1/2">${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-around border-b-2 p-2 px-5">
                <strong className="w-1/2">Shipping :</strong>
                <span className="w-1/2">${order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-around border-b-2 p-2 px-5">
                <strong className="w-1/2">Tax :</strong>
                <span className="w-1/2">${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-around p-2 px-5">
                <strong className="w-1/2">Order Total :</strong>
                <strong className="w-1/2">
                  ${order.totalPrice.toFixed(2)}
                </strong>
              </div>
              {!order.isPaid && (
                <div className="flex justify-around p-2 px-5">
                  {isPending ? (
                    <Loadingcpm />
                  ) : (
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                  {loadingPay && <Loadingcpm></Loadingcpm>}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-3 rounded-md p-[1rem] shadow-md sm:col-span-2">
          <div>
            <h2 className="mb-2 text-center font-bold sm:text-left sm:text-2xl">
              Payment
            </h2>
            <div className="mb-6 text-center sm:text-left">
              <strong>Method:</strong> {order.paymentMethod}
            </div>
            {order.isPaid ? (
              <Messagecpm msgcode={1}>Paid at {order.paidAt}</Messagecpm>
            ) : (
              <Messagecpm msgcode={0}>Not Paid</Messagecpm>
            )}
          </div>
        </div>

        <div className="col-span-3 rounded-md p-[1rem] shadow-md sm:col-span-2">
          <div>
            <h2 className="mb-2 text-center font-bold sm:text-left sm:text-2xl">
              Items
            </h2>
            <div className="text-center">
              {order.orderItems.map((item: CartDet) => (
                <div className="flex justify-start p-2" key={item._id}>
                  <div className="mr-[1rem] w-1/3">
                    <img
                      className="object-contain sm:h-[100px]"
                      src={logo}
                      alt={item.name}
                    />
                  </div>
                  <div className="grow justify-between sm:flex sm:w-2/3 sm:items-center">
                    <Link
                      className="text-blue-700"
                      to={`/products/${item.slug}`}
                    >
                      {item.name}
                    </Link>
                    <div className="mt-5 flex justify-between sm:mt-0">
                      <div className="sm:mr-10">{item.quantity} 件</div>
                      <div>${item.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowOrderPage
