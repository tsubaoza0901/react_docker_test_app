import { useEffect, useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';

const useFormikOnSubmit = <T extends {}, K extends {}>(
  url: string,
  handleSuccess: (data: any) => void,
  handleError: (e: AxiosError) => void = () => {}
) => {
  const [source] = useState(axios.CancelToken.source());

  useEffect(() => {
    return function cleanup() {
      source.cancel('post cancel');
    };
  }, []);

  const onSubmit = useCallback(
    async (
      data: T,
      { setSubmitting }: { setSubmitting: (isSubmittin: boolean) => void }
    ) => {
      return await axios
        .post<K>(url, data, {
          cancelToken: source.token,
          timeout: 15000,
        })
        .then((res) => {
          console.log('post res', res)
          setSubmitting(false);
          handleSuccess(res.data)
          return res
        })
        .catch((e:AxiosError) => {
          console.log('post error', e)
          setSubmitting(false)
          handleError(e)
          if (e.code === 'ECONNABORTED') {
            return e;
          }
          if (!axios.isCancel(e)) {
            return e;
          }
          return e;
        });
    },
    [url, handleSuccess]
  );

  return {
    onSubmit,
  };
};

export default useFormikOnSubmit;
