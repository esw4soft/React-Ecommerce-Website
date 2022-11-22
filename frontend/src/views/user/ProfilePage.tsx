import React, { useContext, useState, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Store } from '../../Store'
import { ProfileReducerState, GetProduct } from '../../types'
import { TextInput, Label } from 'flowbite-react'
import { getError } from '../../utils'

const reducer = (state: ProfileReducerState, action: GetProduct) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true }
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false }
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false }

    default:
      return state
  }
}

const ProfilePage = () => {
  const { state, dispatch: btxDispatch } = useContext(Store)
  const { userInfo } = state
  const [name, setName] = useState(userInfo.name)
  const [email, setEmail] = useState(userInfo.email)
  const [password, setPassword] = useState('')
  const [comfirmPassword, setComfirmPassword] = useState('')

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  })

  const submitHandler = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(
        'api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `knight ${userInfo.token}` },
        }
      )

      dispatch({ type: 'UPDATE_SUCCESS' })
      btxDispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      toast.success('User updated successfully')
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      })
      toast.error(getError(err))
    }
  }
  return (
    <div className="">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="text-center sm:text-left">User Profile</h1>
      <div className="p-5 sm:p-0">
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="Name1" value="Name" />
            </div>
            <TextInput
              id="Name1"
              type="text"
              value={name}
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="cfpassword" value="Comfirm Password" />
            </div>
            <TextInput
              id="cfpassword"
              type="password"
              required={true}
              value={comfirmPassword}
              onChange={(e) => setComfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="my-4 w-full rounded-lg bg-sky-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-900 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
