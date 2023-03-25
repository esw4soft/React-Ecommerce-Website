程式註記:
在練習使用 pull request 時遇到帳號無法上傳到 github 的問題
其原因在於分身帳號沒有使用二次驗證導致不支援使用帳號密碼的身份認證，也就是 HTTPS 的模式上傳
解決方法就是使用 ssh 來 clone 專案
https://123davidbill.medium.com/%E8%A7%A3%E6%B1%BAgithub%E7%84%A1%E6%B3%95push-requested-url-returned-error-403%E5%95%8F%E9%A1%8C-213b08866a38

https://israynotarray.com/git/20210630/3665920401/

https://www.casper.tw/git/2018/02/12/github-ssh-https/

ps 此問題花了我 3 小時解決，還沒玩到法環

# React Side Project: Ecommerce Website

This project will build an ecommerce website.

## Used Web Skill So Far

Front End: React + Redux + TypeScript + SCSS + TailwindCSS

## Notes

紀錄開發時遇到的問題和一些重要註記 123123

1. TypeScript 開發參考  
   `https://pjchender.dev/react/guide-typescript-react-tips/`  
   `https://pjchender.dev/react/note-react-with-ts/`

2. TailwindCSS theme()變數無法直接塞入 SCSS, 需要使用:root 做轉換

```scss
:root {
  --clw: theme(colors.white);
  --bdl: theme(borderRadius.lg);
  --sp6: theme(spacing.6);
  --bsx: theme(boxShadow.xl);
}

@layer components {
  .card {
    background-color: var(--clw);
    border-radius: var(--bdl);
    padding: var(--sp6);
    box-shadow: var(--bsx);
  }
}
```

`https://tailwindcss.com/docs/using-with-preprocessors`

3. Data Store in Typescript  
   store, state, initialState, dispatch(type, payload), reducer, createContext, useContext, useReducer, children...  
   這些的 type 可以參考 Store.tsx 檔案

4. 使用 useLocation 搭配 URLSearchParams 做登入轉址

5. [MongoDB](https://www.mongodb.com/)

6. paypal 製作流程(sandbox)
   1. paypal develop 官網申請 clientID
   2. 前端製作 paypal api 傳 clientID 給 paypal 伺服器
   3. npm install react-paypal-js >> 掛上 paypal Privider, Reducer,
   4. paypal load fuction, paypal button, approve payment function
   5. order api 送入後端
7. paypal 使用者流程(sandbox)
   1. 進到結帳頁面時 前端先送請求到後端拿 keys 存入 paypal dispatch 同時存入訂單資料跟訂單狀態
   2. paypal 按鈕點擊後 傳入訂單資料到 paypal >> 接下來都是在 paypal 操作結帳
   3. 訂單結帳完成後回傳 onApprove function >> 將訂單資料跟結帳狀態存入後端資料庫
   4. 搭配 dispatch reducer 切換畫面顯示物件和成功或失敗狀態

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
