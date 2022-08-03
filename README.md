# React Side Project: Ecommerce Website

This project will build an ecommerce website.

## Used Web Skill So Far

Front End: React + Redux + TypeScript + SCSS + TailwindCSS

## Notes

紀錄開發時遇到的問題和一些重要註記

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
