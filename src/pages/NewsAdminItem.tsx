import { FC } from 'react';
import NewsInfo from '../components/NewsInfo';
import { useParams } from 'react-router-dom';
import { newsApiSlice } from '../store/reducers/NewsApiSlice';
import { INews, useGetQueryResponce } from '../types/responce';
import { useShowErrorToast } from '../hooks';
import NoData from '../components/NoData';
import Loader from '../components/Loader';
// import { newsItemMock } from '../mocks';

const NewsAdminItem: FC = () => {
  const { id } = useParams();
  const { data, error, isLoading } =
    newsApiSlice.useGetAdminNewsQuery<useGetQueryResponce<INews>>(id);

  useShowErrorToast(error);

  return <>
    <NewsInfo newsItem={data} />
    {!data && !isLoading && <NoData />}
    {isLoading && <Loader />}
  </>;
};

export default NewsAdminItem;
