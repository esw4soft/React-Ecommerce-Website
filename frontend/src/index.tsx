import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { HelmetProvider } from 'react-helmet-async'
import { StorePrivider } from './Store'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <StorePrivider>
      <HelmetProvider>
        <PayPalScriptProvider
          deferLoading={true}
          options={{ 'client-id': 'sb' }}
        >
          <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </StorePrivider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
