import React from 'react'

const CheckoutSteps = (props: any) => {
  return (
    <div className="checkbar mb-5 flex justify-center px-10">
      <div className={props.step1 ? 'active' : 'usually'}>登入</div>
      <div className={props.step2 ? 'active' : 'usually'}>物流</div>
      <div className={props.step3 ? 'active' : 'usually'}>支付方式</div>
      <div className={props.step4 ? 'active' : 'usually'}>確認訂單</div>
    </div>
  )
}

export default CheckoutSteps
