import React, { FC, useEffect } from 'react';
import useAsyncPostLogin from '../../usehelpers/async/useAsyncPostLogin';
import { connect } from 'react-redux';

type Values = {
  loginName: string;
  loginPassword: string;
};

const initialValues: Values = { loginName: '', loginPassword: '' };

const LoginPage: FC = () => {
  const { onSubmit, errorMessage } = useAsyncPostLogin<Values, any>();

  return (
    <div>
      <section>
        <div>
          <div>
            <div>
              <h3></h3>
              <hr />
              <div>
                <figure>
                  <img></img>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(null, null)(LoginPage);
