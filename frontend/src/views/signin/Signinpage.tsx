import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Store } from '../../Store'

const Signinpage = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { state, dispatch: btnDispatch } = useContext(Store)

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      })
      btnDispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect || '/')
    } catch (err) {
      alert('invalid email or password')
    }
  }
  return (
    <div className="container mx-auto px-5 sm:w-2/5">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="mb-6">Sign In</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="d block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6 flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 "
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="mb-4 w-full rounded-lg bg-sky-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-900 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
        >
          Sign In
        </button>
        <div className="mb-6">
          New custimer?{' '}
          <Link
            className="border-b-2 border-sky-700 text-sky-700"
            to={`/signup?redirect=${redirect}`}
          >
            Create your account
          </Link>
        </div>
      </form>
    </div>
  )
}
export default Signinpage
