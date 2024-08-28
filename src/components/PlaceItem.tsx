import { FC } from 'react';
import { IPlace, useGetQueryResponce } from '../types/responce';
import { fishPlacesApiSlice } from '../store/reducers/FishPlacesApiSlice';
import { useShowErrorToast } from '../hooks';
import PlaceInfo from './PlaceInfo';
import NoData from './NoData';
import Loader from './Loader';
// import { placeItemMock } from '../mocks';

interface PlaceItemProps {
  currentListItem: number | string | null;
}

const PlaceItem: FC<PlaceItemProps> = ({ currentListItem }) => {
  const { data, error, isLoading } =
    fishPlacesApiSlice.useGetPlaceQuery<useGetQueryResponce<IPlace>>(
      currentListItem
    );

  useShowErrorToast(error);

  return (
    <div
      style={{
        backgroundColor: '#9393f7',
        flexBasis: 700,
        flexGrow: 1,
        boxShadow: '1px 8px 25px 7px rgba(34, 60, 80, 0.2) inset',
      }}
    >
      {data && <PlaceInfo placeData={data} />}
      {!data && !isLoading && currentListItem !== null && (
        <NoData color="white" />
      )}
      {currentListItem === null && !data && !isLoading && (
        <NoData color="white" label={'Select Some Place'} />
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default PlaceItem;
