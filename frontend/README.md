## Front End Notes

1. 環境建置
2. homepage 製作  
   homepage 頁面畫面  
   homepage 頁面畫面 RWD  
   routing : `npm i react-router-dom`
   渲染資料+上型別  
   使用 Reducer 來更新 data 渲染畫面
3. productPage 製作  
   建立 rating component  
   建立 product component  
   routing  
   productpage 頁面畫面  
   productpage RWD  
   渲染資料+上型別  
   建立 loading component  
   建立 message component
4. cartPage 製作
   建立 全域 store, context, reducer, 加入購物車增加數量  
   優化購物車: 確認購物車是否有相同商品, 購物車資料儲存到後端  
   cartpage 頁面畫面  
   cartpage 頁面畫面 RWD  
   routing, navigate  
   購物車按鈕: 增加減少, 確認購買, 刪除, 添加到購物車  
   按鈕上 type
5. signinPage 製作  
   signinpage 頁面畫面 RWD  
   登入送出按鈕 function reducer  
   存 token 在 localstorage  
   登入後 redirect 頁面  
   登入後使用網址回到登入頁時進行跳轉回首頁

   ```jsx
   useEffect(() => {
     if (userInfo) {
       navigate(redirect)
     }
   }, [navigate, redirect, userInfo])
   ```

   登入時 navbar 顯示使用者+ 下拉選單:

   1. 使用 flowbite-react  
      `https://github.com/themesberg/flowbite-react`

   提示訊息美化

   1. 使用 `import { ToastContainer } from 'react-toastify'` `import 'react-toastify/dist/ReactToastify.css'`

6. 購物流程 page 製作  
   step components 製作  
   payment page 畫面+ 流程功能+ 導航  
   shipping page 畫面+ 流程功能+ 導航  
   place order page 畫面+ 流程功能+ 導航

紀錄開發時遇到的問題和一些重要註記

1. 沒有任何多載符合此呼叫。  
   多載 1 (共 5)，'(reducer: ReducerWithoutAction<any>, initializerArg: any, initializer?: undefined): [any, DispatchWithoutAction]'，發生下列錯誤。

   類型 '(state: StateType, action: ActionType) => { cart: { cartItems: any[]; shippingAddress: ShippingDet; paymentMethod: string; }; userInfo?: any; } | { userInfo: null; cart: { ...; }; } | { ...; } | { ...; }' 的引數不可指派給類型 'ReducerWithoutAction<any>' 的參數。

多載 2 (共 5)，'(reducer: (state: StateType, action: ActionType) => { cart: { cartItems: any[]; shippingAddress: ShippingDet; paymentMethod: string; }; userInfo?: any; } | { ...; } | { ...; } | { ...; }, initialState: never, initializer?: undefined): [...]'，發生下列錯誤。

類型 'StateType' 的引數不可指派給類型 'never' 的參數。`

ANS: 檢查所有用到 cartItems 的東西有沒有填上,發生在 cartItems 加入 payment, 因為 reducer 的 logout 位置少加了 payment 而報錯,所以每當加入新資料時需要檢查每個有用到此資料的地方

2. Number.EPSILON 解決誤差範圍: ex 0.1+0.2=0.3 的誤差

3. "homepage": "https://esw4soft.github.io/React-Ecommerce-Website",
