import { FC, useEffect, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { authApiSlice } from '../store/reducers/AuthApiSlice';
import { useAppDispatch, useShowErrorToast } from '../hooks';
import { setUserData, setUserToken } from '../store/reducers/AuthSlice';
import { getUserFromToken } from '../utils';
import { setToken } from '../utils/localStorage';
import { createToast } from '../utils/toasts';
import AuthorizationSignUpForm from '../components/AuthorzationSignUpForm';
import AuthorizationLoginForm from '../components/AuthorzationLoginForm';
import { useLocation, useNavigate } from 'react-router-dom';

interface IAuthorizationModal {
  setVisible: (data: boolean) => void;
}

const AuthorizationModal: FC<IAuthorizationModal> = ({ setVisible }) => {
  const [formValue, setFormValue] = useState<'login' | 'signUp'>('login');
  const [login, { data, error, isLoading }] = authApiSlice.useLoginMutation();
  const [signUp, { data: signUpData, error: signUpError, isLoading: signUpIsLoading }] =
    authApiSlice.useSignUpMutation();

  const history = useNavigate();
  const routeLocation = useLocation();
  const dispatch = useAppDispatch();

  const params = new URLSearchParams(routeLocation.search);
  const from = params.get("from") || "/";

  const ref = useRef<() => void>(null!);
  const refSubmitting = useRef<(data: boolean) => void>(null!);

  useShowErrorToast(error);
  useShowErrorToast(signUpError);

  const onHide = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (error || signUpError) {
      refSubmitting.current(false);
    }
  }, [error, signUpError]);

  useEffect(() => {
    if (signUpData) {
      ref.current();
      refSubmitting.current(false);

      setFormValue('login');
      createToast.success('User Created');
    }
  }, [signUpData]);

  useEffect(() => {
    if (data) {
      ref.current();
      refSubmitting.current(false);

      const user = getUserFromToken(data.access_token);

      if (user) {
        setToken(data.access_token);
        dispatch(setUserToken(data.access_token));
        dispatch(setUserData(user));
        history(from);
      }

      onHide();
    }
  }, [data]);

  const onFormTypeChange = (resetForm: () => void) => {
    resetForm();

    if (formValue === 'login') {
      setFormValue('signUp');
    } else {
      setFormValue('login');
    }
  };

  const onSubmit = (
    values: object,
    setSubmitting: (data: boolean) => void,
    resetForm: () => void
  ) => {
    ref.current = resetForm;
    refSubmitting.current = setSubmitting;

    if (formValue === 'login') {
      login(values);
    } else {
      signUp({...values, confirm_password: undefined });
    }
  };

  return (
    <Dialog
      visible
      modal
      onHide={onHide}
      content={() => {
        if (formValue === 'login') {
          return (
            <AuthorizationLoginForm
              onCancel={onHide}
              onFormTypeChange={onFormTypeChange}
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
          );
        }
        return (
          <AuthorizationSignUpForm
            onCancel={onHide}
            onFormTypeChange={onFormTypeChange}
            onSubmit={onSubmit}
            isLoading={signUpIsLoading}
          />
        );
      }}
    ></Dialog>
  );
};

export default AuthorizationModal;
