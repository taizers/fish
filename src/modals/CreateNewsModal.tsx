import { Dialog } from 'primereact/dialog';
import { FC, useEffect, useRef } from 'react';
import { createToast } from '../utils/toasts';
import { useShowErrorToast } from '../hooks';
import { newsApiSlice } from '../store/reducers/NewsApiSlice';
import CreateNewsForm from '../components/CreateNewsForm';

interface CreatePlaceModalProps {
  setVisible: (data: boolean) => void;
}

const CreateNewsModal: FC<CreatePlaceModalProps> = ({ setVisible }) => {
  const [createNews, { data, error, isLoading }] = newsApiSlice.useAddNewsMutation();

  const ref = useRef<(data: boolean) => void>(null!);

  useShowErrorToast(error);

  const onHide = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (data) {
      ref.current(false);
      createToast.success('News Created');
      onHide();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      ref.current(false);
    }
  }, [error]);

  const onSubmit = (values: object, setSubmitting: (data: boolean) => void) => {
    console.log(values);
    ref.current = setSubmitting;

    createNews(values);
  };

  return (
    <Dialog
      visible
      modal
      style={{ width: '90%', maxWidth: '800px' }}
      onHide={onHide}
      content={() => <CreateNewsForm isLoading={isLoading} onCancel={onHide} onSubmit={onSubmit} />}
    ></Dialog>
  );
};

export default CreateNewsModal;
