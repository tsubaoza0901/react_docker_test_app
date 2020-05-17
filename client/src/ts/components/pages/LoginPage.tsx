import React, { FC, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import useAsyncPostLogin from '../../usehelpers/async/useAsyncPostLogin';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import urls from '../../configs/urls';
import { Formik, Form, Field } from 'formik';

const GlobalStyle = createGlobalStyle`
`;

const Input = styled.input`
  max-width: 100%;
  width: 100%;
  padding: 10px 5px;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: red;
`;

type Values = {
  loginName: string;
  loginPassword: string;
};

const initialValues: Values = { loginName: '', loginPassword: '' };

const LoginPage: FC = () => {
  const { onSubmit, errorMessage } = useAsyncPostLogin<Values, any>();
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem('userId')) {
      history.push(urls.home.path);
    }
  }, []);
  return (
    <div>
      <GlobalStyle />
      <section>
        <div>
          <div>
            <div>
              <h3>Login</h3>
              <hr />
              <div>
                <figure>
                  <img />
                </figure>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                  <Form>
                    <div>
                      <Field
                        as={Input}
                        name="loginName"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <Field
                        as={Input}
                        name="loginPassword"
                        type="password"
                        placeholder="Your Password"
                      />
                    </div>
                    <button type="submit">
                      Login<i aria-hidden="true"></i>
                    </button>
                  </Form>
                </Formik>
                <ErrorMessage>{errorMessage || null}</ErrorMessage>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(null, null)(LoginPage);
