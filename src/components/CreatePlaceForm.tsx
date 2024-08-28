import { FC, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import {
  MyCheckbox,
  MyMultiSelect,
  MySelect,
  MyTextInput,
  MyTextTextAria,
} from './FormsFields';
import { Button } from 'primereact/button';
import LocationMap from './LocationMap';
import { ICords } from '../types';
import { fishes, placeTypes } from '../mocks';
import FileUploader from './FileUploader';
import { fileResponse } from '../types/responce';

interface CreatePlaceFormProps {
  onSubmit: (value: object, setSubmitting: (data: boolean) => void) => void;
  onCancel: () => void;
  isLoading: boolean;
}

interface CreatePlaceData {
  name: string;
  coordinates: string;
  requirePayment: boolean;
  description: string;
  photos: { photoPath: string }[];
  fish: number[];
  typePlace: { id: number };
  owner?: {
    name: string;
    number: string;
  };
}

const CreatePlaceForm: FC<CreatePlaceFormProps> = ({ onSubmit, onCancel, isLoading }) => {
  const [cords, setCords] = useState<ICords>(null!);
  const [filesLinks, setFilesLinks] = useState<fileResponse[]>(null!);

  const setCordsValue = (
    cords: ICords,
    setFieldValue: (
      field: string,
      value: unknown,
      shouldValidate?: boolean
    ) => void
  ) => {
    setCords(cords);
    setFieldValue('cords', [cords.lat, cords.lng].join(','));
  };

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        requirePayment: false,
        ownerName: '',
        ownerPhone: '',
        cords: '',
        fishes: [],
        typeOfPlace: {} as { id: number; name: string },
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        description: Yup.string()
          .max(500, 'Must be 500 characters or less')
          .required('Required'),
        typeOfPlace: Yup.object()
          .shape({
            name: Yup.string()
              .oneOf(
                placeTypes.map((item) => item.name),
                'Must be selected'
              )
              .required('Required'),
          })
          .required('Required'),
        fishes: Yup.array().min(1, 'Must be selected').required('Required'),
        cords: Yup.string().required('Required'),
        requirePayment: Yup.boolean(),
        ownerName: Yup.string().when('requirePayment', (value, schema) => {
          return value[0]
            ? schema
                .max(20, 'Must be 20 characters or less')
                .required('Required')
            : schema;
        }),
        ownerPhone: Yup.string().when('requirePayment', (value, schema) => {
          return value[0]
            ? schema
                .max(20, 'Must be 20 characters or less')
                .required('Required')
            : schema;
        }),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const data = {
          coordinates: [cords.lat, cords.lng].join(','),
          photos: filesLinks?.map((item) => ({ photoPath: item.fileUrl })),
          name: values.name,
          description: values.description,
          fish: values.fishes?.map((item: { id: number }) => item.id),
          requirePayment: values.requirePayment,
          typePlace: { id: values.typeOfPlace?.id },
        } as CreatePlaceData;

        if (values.requirePayment) {
          data.owner = {
            name: values.ownerName,
            number: values.ownerPhone,
          };
        }

        onSubmit(data, setSubmitting);
      }}
    >
      {({
        isValid,
        isSubmitting,
        dirty,
        values,
        errors,
        setFieldValue,
        touched,
      }) => {
        return (
          <Form
            className="flex flex-column px-4 py-5 gap-2 overflow-y-auto"
            style={{
              borderRadius: '12px',
              backgroundImage:
                'radial-gradient(circle at left top, var(--primary-800), var(--primary-700))',
            }}
          >
            <h3
              style={{ fontSize: '20px' }}
              className="text-primary-50 font-semibold align-self-center"
            >
              {'Create Place'}
            </h3>
            <MyTextInput
              label={'Name'}
              name={'name'}
              type={'text'}
              placeholder={'Name'}
            />
            <MyTextTextAria
              label={'Description'}
              name={'description'}
              type={'text'}
              style={{ marginTop: '15px' }}
            />
            <MyCheckbox name={'requirePayment'}>
              {'Place require payment'}
            </MyCheckbox>
            {values.requirePayment && (
              <>
                <MyTextInput
                  label={'Owner Name'}
                  name={'ownerName'}
                  type={'text'}
                  placeholder={'Owner Name'}
                />
                <MyTextInput
                  label={'Owner Phone'}
                  name={'ownerPhone'}
                  type={'phone'}
                  placeholder={'Owner Phone'}
                />
              </>
            )}
            <MyMultiSelect
              name={'fishes'}
              optionLabel={'name'}
              options={fishes}
              placeholder={'Select Fishes'}
              maxSelectedLabels={5}
            />
            <MySelect
              name={'typeOfPlace'}
              optionLabel={'name'}
              options={placeTypes}
              placeholder={'Select type of place'}
            />
            <FileUploader setFilesLinks={setFilesLinks} />
            <div>
              <LocationMap
                cords={cords}
                setCords={(cords) => {
                  setCordsValue(cords, setFieldValue);
                }}
              />
              {errors.cords && touched.cords && (
                <div className="field-error">{errors.cords}</div>
              )}
            </div>
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
        );
      }}
    </Formik>
  );
};

export default CreatePlaceForm;
