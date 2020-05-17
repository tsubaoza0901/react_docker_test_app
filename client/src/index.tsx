// ------------------------------
// TypeScript（型安全未実装）※ material-uiあり
// ------------------------------
/*
【note】
＜material-ui導入＞
1．material-uiのインストール
2．index.tsxへのMuiThemeProviderのimport

＜material-uiを使用した一覧表示修正＞
1．users_index.tsxへのmaterial-ui関連パッケージのimport
2．material-ui導入に伴うdomの変更
・table → Table
・thead → TableHeader
・tr → TableRow
・th → TableHeaderColumn
・tbody → TableBody
・td → TableRowColumn
3．チェックボックスの調整
4．新規作成ボタンの作成

＜material-uiを使用した新規作成画面、詳細画面の表示修正＞
1．
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
// 追加---------------------------
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// ------------------------------

import reducer from './ts/reducers';
import UsersIndex from './ts/components/pages/users_index';
import UsersNew from './ts/components/pages/users_new';
import UsersShow from './ts/components/pages/users_show';
import LoginPage from './ts/components/pages/LoginPage';
// import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

const enhancer =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);

// componentの型定義で使用できるようexportを追加（5/11）
export const store = createStore(reducer, enhancer);

ReactDOM.render(
  // MuiThemeProviderコンポーネントでProviderコンポーネントをラップ
  <MuiThemeProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/users/new" component={UsersNew} />
          <Route path="/users/:id" component={UsersShow} />
          <Route exact path="users" component={UsersIndex} />
          <Route exact path="/" component={UsersIndex} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// ------------------------------
// TypeScript（型安全未実装）※ material-uiなし
// ------------------------------
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { composeWithDevTools } from 'redux-devtools-extension';

// import reducer from './ts/reducers';
// import UsersIndex from './ts/components/users_index';
// import UsersNew from './ts/components/users_new';
// import UsersShow from './ts/components/users_show';
// // import './index.css';
// // import App from './App';
// import * as serviceWorker from './serviceWorker';

// // デバックツール設定
// const enhancer =
//   process.env.NODE_ENV === 'development'
//     ? composeWithDevTools(applyMiddleware(thunk))
//     : applyMiddleware(thunk);
// const store = createStore(reducer, enhancer);

// ReactDOM.render(
// 【重要】Providerの目的は2つ
// 1. Reactコンポーネント内でreact-reduxのconnect()関数を使えるようにすること
// 2. ラップしたコンポーネントにstore情報を渡すこと
//   <Provider store={store}>
//     <BrowserRouter>
//       <Switch>
//         <Route path="/users/new" component={UsersNew} />
//         <Route path="/users/:id" component={UsersShow} />
//         <Route exact path="users" component={UsersIndex} />
//         <Route exact path="/" component={UsersIndex} />
//       </Switch>
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
