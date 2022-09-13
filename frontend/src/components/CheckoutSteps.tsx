import React from 'react'

const CheckoutSteps = (props: any) => {
  return (
    <div className="checkbar mb-5 flex justify-center px-10">
      <div className={props.step1 ? 'active' : 'usually'}>Sign In</div>
      <div className={props.step2 ? 'active' : 'usually'}>Shipping</div>
      <div className={props.step3 ? 'active' : 'usually'}>Payment</div>
      <div className={props.step4 ? 'active' : 'usually'}>Place Order</div>
    </div>
  )
}

export default CheckoutSteps
