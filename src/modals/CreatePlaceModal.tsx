import { Dialog } from 'primereact/dialog';
import { FC, useEffect, useRef } from 'react';
import { fishPlacesApiSlice } from '../store/reducers/FishPlacesApiSlice';
import { createToast } from '../utils/toasts';
import { useShowErrorToast } from '../hooks';
import CreatePlaceForm from '../components/CreatePlaceForm';

interface CreatePlaceModalProps {
  setVisible: (data: boolean) => void;
}

const CreatePlaceModal: FC<CreatePlaceModalProps> = ({ setVisible }) => {
  const [createPlace, { data, error, isLoading }] =
    fishPlacesApiSlice.useAddFishPlaceMutation();

  const ref = useRef<(data: boolean) => void>(null!);

  useShowErrorToast(error);

  const onHide = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (data) {
      ref.current(false);
      createToast.success('Place Created');
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

    createPlace(values);
  };

  return (
    <Dialog
      visible
      modal
      style={{ width: '90%', maxWidth: '800px' }}
      onHide={onHide}
      content={() => <CreatePlaceForm isLoading={isLoading} onCancel={onHide} onSubmit={onSubmit} />}
    ></Dialog>
  );
};

export default CreatePlaceModal;
