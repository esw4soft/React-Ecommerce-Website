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

紀錄開發時遇到的問題和一些重要註記
