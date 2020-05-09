// ------------------------------
// 以下、js → tsへ第一弾
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
