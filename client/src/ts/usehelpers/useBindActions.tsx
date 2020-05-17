import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

//action creatorの引数を全てunionした型を愚直に定義する以外に
//解決方法が浮かばなかったためanyを使用

export const useBindAction = <T extends (...args: any[]) => void>(
  action: T
) => {
  const dispatch = useDispatch();
  const fn = (...args: Parameters<T>): void => dispatch(action(...args));
  return useCallback(fn, []);
};

// Todo: [key]: useCallback のところで以下のエラーが出るためコード全体を理解して修正
// Line 20:14:  React Hook "useCallback" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function
export const useBindActions = (actions: { [s: string]: any }) => {
  const dispatch = useDispatch();
  return Object.entries(actions).reduce(
    (acc, [key, action]) => ({
      ...acc,
      [key]: useCallback(
        (...args: Parameters<typeof action>) => dispatch(action(...args)),
        []
      ),
    }),
    {}
  );
};

export default { useBindAction, useBindActions };
