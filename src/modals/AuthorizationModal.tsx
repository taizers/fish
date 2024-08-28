import { FC, useEffect, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { authApiSlice } from '../store/reducers/AuthApiSlice';
import { useAppDispatch, useShowErrorToast } from '../hooks';
import { setUserData, setUserToken } from '../store/reducers/AuthSlice';
import { getUserFromToken } from '../utils';
import { setToken } from '../utils/localStorage';
import { createToast } from '../utils/toasts';
// import AuthorizationForm from '../components/AuthorzationForm';
// import * as Yup from 'yup';
import AuthorizationSignUpForm from '../components/AuthorzationSignUpForm';
import AuthorizationLoginForm from '../components/AuthorzationLoginForm';

interface IAuthorizationModal {
  setVisible: (data: boolean) => void;
}

// const formsData = {
//   login: {
//     title: 'Login',
//     buttonTitle: 'Login',
//     switchButtonTitle: "I don't have an account",
//     fields: [
//       {
//         name: 'login',
//         label: 'Login',
//         type: 'text',
//         placeholder: 'Login...',
//         initialValue: '',
//         validation: Yup.string()
//           .max(15, 'Must be 15 characters or less')
//           .required('Required'),
//       },
//       {
//         name: 'password',
//         label: 'Password',
//         type: 'password',
//         initialValue: '',
//         validation: Yup.string()
//           .min(2, 'Must be 8 characters or more') //TODO return to 8
//           .max(20, 'Must be 20 characters or less')
//           .required('Required'),
//       },
//     ],
//   },
//   signUp: {
//     title: 'Sign Up',
//     buttonTitle: 'Sign Up',
//     switchButtonTitle: 'I have an account',
//     fields: [
//       {
//         name: 'login',
//         label: 'Login',
//         type: 'text',
//         placeholder: 'Login...',
//         initialValue: '',
//         validation: Yup.string()
//           .max(15, 'Must be 15 characters or less')
//           .required('Required'),
//       },
//       {
//         name: 'email',
//         label: 'Email',
//         type: 'email',
//         placeholder: 'Email...',
//         initialValue: '',
//         validation: Yup.string().email('Invalid email').required('Required'),
//       },
//       {
//         name: 'name',
//         label: 'Name',
//         type: 'text',
//         placeholder: 'Your name...',
//         initialValue: '',
//         validation: Yup.string()
//           .max(20, 'Must be 20 characters or less')
//           .required('Required'),
//       },
//       {
//         name: 'password',
//         label: 'Password',
//         type: 'password',
//         initialValue: '',
//         validation: Yup.string()
//           .min(8, 'Must be 8 characters or more')
//           .max(20, 'Must be 20 characters or less')
//           .required('Required'),
//       },
//       {
//         name: 'confirmpassword',
//         label: 'Confirm password',
//         type: 'password',
//         initialValue: '',
//         validation: Yup.string().oneOf(
//           [Yup.ref('password')],
//           'Passwords must match'
//         ),
//       },
//     ],
//   },
// };

const AuthorizationModal: FC<IAuthorizationModal> = ({ setVisible }) => {
  const [formValue, setFormValue] = useState<'login' | 'signUp'>('login');
  const [login, { data, error, isLoading }] = authApiSlice.useLoginMutation();
  const [signUp, { data: signUpData, error: signUpError, isLoading: signUpIsLoading }] =
    authApiSlice.useSignUpMutation();

  const dispatch = useAppDispatch();

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
    values: { confirm_password?: string },
    setSubmitting: (data: boolean) => void,
    resetForm: () => void
  ) => {
    ref.current = resetForm;
    refSubmitting.current = setSubmitting;

    if (formValue === 'login') {
      login(values);
    } else {
      delete values.confirm_password;
      signUp(values);
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
