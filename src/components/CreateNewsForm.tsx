import { FC, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { MyTextInput, MyTextTextAria } from './FormsFields';
import { Button } from 'primereact/button';
import { fileResponse } from '../types/responce';
import FileUploader from './FileUploader';

interface CreateNewsFormProps {
  onSubmit: (value: object, setSubmitting: (data: boolean) => void) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const CreateNewsForm: FC<CreateNewsFormProps> = ({ onSubmit, onCancel, isLoading }) => {
  const [filesLinks, setFilesLinks] = useState<fileResponse[]>(null!);

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        requirePayment: false,
        ownerName: '',
        ownerPhone: '',
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        description: Yup.string()
          .max(500, 'Must be 500 characters or less')
          .required('Required'),
        text: Yup.string()
          .max(10000, 'Must be 10000 characters or less')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(
          {
            ...values,
            photos: filesLinks?.map((item) => ({ photoPath: item.fileUrl })),
          },
          setSubmitting
        );
      }}
    >
      {({ isValid, isSubmitting, dirty }) => (
        <Form
          className="flex flex-column px-4 py-5 gap-2 overflow-y-auto"
          style={{
            borderRadius: '12px',
            backgroundImage:
              'radial-gradient(circle at left top, var(--primary-800), var(--primary-700))',
          }}
        >
          <p
            style={{ fontSize: '20px' }}
            className="text-primary-50 font-semibold align-self-center"
          >
            {'Create News'}
          </p>
          <MyTextInput
            label={'Ttile'}
            name={'title'}
            type={'text'}
            placeholder={'Title'}
          />
          <FileUploader setFilesLinks={setFilesLinks} />
          <MyTextTextAria
            label={'Description'}
            name={'description'}
            type={'text'}
            style={{ marginTop: '15px' }}
          />
          <MyTextTextAria
            label={'Text'}
            name={'text'}
            type={'text'}
            style={{ marginTop: '15px' }}
          />
          <div className="flex align-items-center gap-2">
            <Button
              label={'Create'}
              disabled={isSubmitting || !isValid || !dirty}
              type="submit"
              loading={isLoading}
              text
              className="submitButton p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
            <Button
              label="Cancel"
              onClick={onCancel}
              loading={isLoading}
              text
              className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateNewsForm;
