import { FC } from 'react';
import { Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import * as Yup from 'yup';
import { MyTextInput } from './FormsFields';

interface IFormData {
  title: string;
  buttonTitle: string;
  switchButtonTitle: string;
  fields: {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    initialValue: string;
    validation: Yup.StringSchema<
      string | undefined,
      Yup.AnyObject,
      undefined,
      ''
    >;
  }[];
}

type FieldType =
  | 'name'
  | 'label'
  | 'type'
  | 'placeholder'
  | 'initialValue'
  | 'validation';

interface AuthorizationLoginFormProps {
  onSubmit: (
    value: object,
    setSubmitting: (data: boolean) => void,
    resetForm: () => void
  ) => void;
  onFormTypeChange: (formReset: () => void) => void;
  onCancel: () => void;
}

function getFormValues<T>(formData: IFormData, feild: FieldType) {
  const obj = {} as {
    [key in string | number | symbol]:
      | string
      | Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ''>
      | undefined;
  };

  formData.fields.forEach((item) => {
    obj[item.name] = item[feild];
  });

  return obj as T;
}

const formData = {
  title: 'Login',
  buttonTitle: 'Login',
  switchButtonTitle: "I don't have an account",
  fields: [
    {
      name: 'login',
      label: 'Login',
      type: 'text',
      placeholder: 'Login...',
      initialValue: '',
      validation: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      initialValue: '',
      validation: Yup.string()
        .min(2, 'Must be 8 characters or more') //TODO return to 8
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    },
  ],
};

const AuthorizationLoginForm: FC<AuthorizationLoginFormProps> = ({
  onSubmit,
  onCancel,
  onFormTypeChange,
}) => {
  return (
    <Formik
      initialValues={getFormValues<object>(formData, 'initialValue')}
      validationSchema={Yup.object(
        getFormValues<Yup.ObjectShape>(formData, 'validation')
      )}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values, setSubmitting, resetForm);
      }}
    >
      {({ isValid, isSubmitting, dirty, resetForm }) => (
        <Form
          className="flex flex-column px-6 py-5 gap-2 overflow-y-auto"
          style={{
            borderRadius: '12px',
            backgroundImage:
              'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))',
          }}
        >
          <p
            style={{ fontSize: '20px' }}
            className="text-primary-50 font-semibold align-self-center"
          >
            {formData.title}
          </p>
          {formData.fields.map((item, index) => (
            <MyTextInput
              key={index}
              label={item.label}
              name={item.name}
              type={item.type}
              placeholder={item.placeholder}
            />
          ))}
          <div className="flex align-items-center gap-2">
            <Button
              label={formData.buttonTitle}
              disabled={isSubmitting || !isValid || !dirty}
              type="submit"
              text
              className="submitButton p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
            <Button
              label="Cancel"
              onClick={onCancel}
              text
              className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
          </div>
          <Button
            style={{ height: '20px' }}
            onClick={() => {
              onFormTypeChange(resetForm);
            }}
            type="button"
            label={formData.switchButtonTitle}
          />
        </Form>
      )}
    </Formik>
  );
};

export default AuthorizationLoginForm;
