import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Store } from '../../Store'

const ProfilePage = () => {
  const { state, dispatch: btxDispatch } = useContext(Store)
  const { userInfo } = state
  return (
    <div className="">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1>123</h1>
    </div>
  )
}

export default ProfilePage
