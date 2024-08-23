import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IPlace, useGetQueryResponce } from '../types/responce';
import { useShowErrorToast } from '../hooks';
import { fishPlacesApiSlice } from '../store/reducers/FishPlacesApiSlice';
import PlaceInfo from '../components/PlaceInfo';
// import { placeItemMock } from '../mocks';

const PlaceAdmin: FC = () => {
  const { id } = useParams();
  const { data, error } =
    fishPlacesApiSlice.useGetAdminPlaceQuery<useGetQueryResponce<IPlace>>(id);

  useShowErrorToast(error);

  return <PlaceInfo placeData={data} />;
};

export default PlaceAdmin;
