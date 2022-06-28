import React from 'react'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

interface RatingProps {
  rating: number
  numReviews: number
}

function Rating(props: RatingProps) {
  const { rating, numReviews } = props
  return (
    <div className="rating flex items-center">
      <span>
        {rating >= 1 ? (
          <BsStarFill className="text-yellow-400" />
        ) : rating >= 0.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span>
        {rating >= 2 ? (
          <BsStarFill />
        ) : rating >= 1.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span>
        {rating >= 3 ? (
          <BsStarFill />
        ) : rating >= 2.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span>
        {rating >= 4 ? (
          <BsStarFill />
        ) : rating >= 3.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span>
        {rating >= 5 ? (
          <BsStarFill />
        ) : rating >= 4.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <p className="ml-1">{numReviews} reviews</p>
    </div>
  )
}

export default Rating
