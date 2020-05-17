import { useCallback, useState } from 'react';
import urls from '../../configs/urls';
import { useSetUser } from '../../actions/user';
import { useHistory } from 'react-router';
import useFormikOnSubmit from '../useFormikOnSubmit';
import { AxiosError } from 'axios';

const useAsyncPostLogin = <T extends {}, K extends {}>() => {
  const setUser = useSetUser();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const handleError = useCallback((e: AxiosError) => {
    console.log(e);
    if (e.response) {
      switch (e.response.status) {
        case 401:
          setErrorMessage(
            'ユーザー名またはパスワードが間違っています。もう一度入力してください。'
          );
          break;
        default:
          setErrorMessage(
            '予期しないエラーが発生しました。もう一度初めから入力してください。'
          );
      }
    }
  }, []);
  const handleSuccess = useCallback((data: any) => {
    if (data === 'Already login.') {
      history.push(urls.home.path);
    }
    setUser(data);
    console.log(data);
    const userId = data.id;
    localStorage.setItem('userId', userId);
    history.push(urls.home.path);
  }, []);
  const { onSubmit } = useFormikOnSubmit<T, K>(
    '/api/v1/login',
    handleSuccess,
    handleError
  );
  return { onSubmit, errorMessage };
};

export default useAsyncPostLogin;
