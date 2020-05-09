// ------------------------------
// TypeScript（型安全未実装）※ material-uiなし
// ------------------------------
/*
【note】
・Reducer：状態とアクションを受け取って、次の状態を返す役割を持った箇所
https://shgam.hatenadiary.jp/entry/2018/11/10/004819
 */

import _ from 'lodash';
import {
  CREATE_USER,
  READ_USERS,
  READ_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../actions';

interface Users {}

// TypeScriptへの変換に伴い、 users = {} を users = [] に変更（そうしないと、delete users[action.id]でエラー）
export default (users = [], action: any) => {
  switch (action.type) {
    case CREATE_USER:
    case READ_USER:
    case UPDATE_USER:
      const data = action.response.data;
      return { ...users, [data.id]: data };
    case READ_USERS:
      // console.log(action.response.data);
      return _.mapKeys(action.response.data, 'id');
    case DELETE_USER:
      delete users[action.id];
      return { ...users }; // 「...（スプレッド演算子）」を使用することで、新しいメモリ空間上に更新されたuserのオブジェクトをreducerが返してくれる。
    default:
      return users;
  }
};
