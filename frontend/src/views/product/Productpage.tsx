import React from 'react'
import { useParams } from 'react-router-dom'

function Productpage() {
  const params = useParams()
  const { slug } = params
  console.log(slug)
  return <div>{slug}</div>
}

export default Productpage
