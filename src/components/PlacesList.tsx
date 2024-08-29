import { FC, useState } from 'react';
import PlaceListItem from './PlaceListItem';
import PaginationComponent from './Pagination';
import { fishPlacesApiSlice } from '../store/reducers/FishPlacesApiSlice';
import { useAppSelector, useShowErrorToast } from '../hooks';
import {
  IFishPlaceListItem,
  IResponcePaginatedData,
  useGetQueryResponce,
} from '../types/responce';
// import { listOfPlacesMock } from '../mocks';
import { Button } from 'primereact/button';
import CreatePlaceModal from '../modals/CreatePlaceModal';
import { adminRole, authorRole, defaultPaginationLimit, defaultPaginationPage, moderatorRole } from '../constants.ts';
import NoData from './NoData';
import Loader from './Loader';

interface PlacesListProps {
  setCurrentListItem: (id: string | number) => void;
  currentListItem: string | number | null;
}

const PlacesList: FC<PlacesListProps> = ({ setCurrentListItem, currentListItem }) => {
  const [page, setPage] = useState<number>(defaultPaginationPage);
  const [limit, setLimit] = useState<number>(defaultPaginationLimit);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { data, error, isLoading } = fishPlacesApiSlice.useGetPlacesListQuery<
    useGetQueryResponce<IResponcePaginatedData<IFishPlaceListItem>>
  >({
    page,
    limit,
  });

  const { user } = useAppSelector((state) => state.auth);

  useShowErrorToast(error);

  return (
    <div
      style={{
        backgroundColor: '#8c8cf8',
        flexBasis: 300,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        gap: '15px',
        boxShadow: '1px 8px 25px 7px rgba(34, 60, 80, 0.2) inset',
      }}
    >
      {(user?.roles?.includes(adminRole) ||
        user?.roles?.includes(moderatorRole) ||
        user?.roles?.includes(authorRole)) && (
        <>
          <Button
            label="Create Place"
            text
            onClick={() => setModalOpen(true)}
            style={{ alignSelf: 'end' }}
            className="create-place-button p-3 text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
          ></Button>
          {isModalOpen && <CreatePlaceModal setVisible={setModalOpen} />}
        </>
      )}
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        {data?.items?.map((item, index) => (
          <PlaceListItem
            currentListItem={currentListItem}
            onItemClick={setCurrentListItem}
            place={item}
            key={index}
          />
        ))}
        {!data && !isLoading && <NoData color="white" />}
        {isLoading && <Loader />}
      </div>
      <PaginationComponent
        page={{ current: page, setPage }}
        limit={{ current: limit, setLimit }}
        itemsCount={data?.itemCounts || 1}
      />
    </div>
  );
};

export default PlacesList;
