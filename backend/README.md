## Backend End Notes

1. 環境建置
2. 建立 nodejs server
3. 建立 route 並且和前端做串接使其取得資料
4. 連接 mongodb
   1. 網站建立雲端資料庫
   2. 創建.ENV
   3. 後端連接資料庫  
      `npm install mongoose --save`  
      `npm install dotenv --save`
5. 資料進資料庫+連接取得資料
   1. 創一個寫進資料庫的 product model
   2. 創建一個寫進資料庫的 route & 資料進資料庫的函式
   3. 創建一個取得資料庫資料的 route & 取出資料做各種處理(單一商品,購物車)
   4. 刪除原本 server.js 裡從本地取得的資料函式
   5. id 名稱修改(numberk>>\_id)
6. 登入驗證
   使用 `npm install express-async-handler jsonwebtoken`  
   登入後給 token

7. 創建訂單資料
   0. 流程: 前端 dispatch+reducer 開始 axios post 資料夾帶 header token 到後端(PlaceOrderPage.tsx) > 後端路由導向(server.js) > (orderRouter.js)頁面導入 order model 寫進資料庫函式(ordermodel.js),中介檢查 token isAuth 函式(utils.js) > 資料近來 orderRouter 後,先用中介軟體檢查 token >確認沒問題後用 orderModel 寫進資料庫 > 成功或錯誤會回傳前端訊息 > 前端清除 store 裡面購物車資料 + localstorage 資料 > 跳到結帳完成畫面
   1. 開資料庫的訂單欄位(model)
   1. 寫入資料庫的後端 function
   1. 接上 route 跟前端對接
8. 查看訂單資料
   1. 新增訂單 id api 接上用 id 找訂單回傳前端  
      紀錄開發時遇到的問題和一些重要註記
