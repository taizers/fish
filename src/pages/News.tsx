import { FC, useState } from 'react';
import PaginationComponent from '../components/Pagination';
import NewsListItem from '../components/NewsListItem';
import { Button } from 'primereact/button';
import CreateNewsModal from '../modals/CreateNewsModal';
import { newsApiSlice } from '../store/reducers/NewsApiSlice';
import { useAppSelector, useShowErrorToast } from '../hooks';
import {
  INewsItem,
  IResponcePaginatedData,
  useGetQueryResponce,
} from '../types/responce';
import { adminRole, defaultPaginationLimit, defaultPaginationPage, journalistRole, moderatorRole } from '../constants.ts';
import NoData from '../components/NoData';
import Loader from '../components/Loader';

const News: FC = () => {
  const [page, setPage] = useState<number>(defaultPaginationPage);
  const [limit, setLimit] = useState<number>(defaultPaginationLimit);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { data, error, isLoading } = newsApiSlice.useGetNewsListQuery<
    useGetQueryResponce<IResponcePaginatedData<INewsItem>>
  >({
    page,
    limit,
  });

  const { user } = useAppSelector((state) => state.auth);

  useShowErrorToast(error);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        gap: '15px',
        overflowY: 'auto',
      }}
    >
      {(user?.roles?.includes(adminRole) ||
        user?.roles?.includes(moderatorRole) ||
        user?.roles?.includes(journalistRole)) && (
        <>
          <Button
            label="Create News"
            onClick={() => setModalOpen(true)}
            style={{ alignSelf: 'end' }}
            className="p-button font-bold create-news-button"
          ></Button>
          {isModalOpen && <CreateNewsModal setVisible={setModalOpen} />}
        </>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '20px',
          padding: '10px',
          width: '100%',
        }}
      >
        {data?.items.map((item, index) => (
          <NewsListItem newsItem={item} key={index} />
        ))}
        {!data && !isLoading && <NoData />}
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

export default News;
