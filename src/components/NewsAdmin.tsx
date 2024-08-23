import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTable from './AdminTable';
import PaginationComponent from './Pagination';
import { newsApiSlice } from '../store/reducers/NewsApiSlice';
import { useShowErrorToast } from '../hooks';
import {
  IAdminItem,
  IResponcePaginatedData,
  useGetQueryResponce,
} from '../types/responce';
import {
  deleteTemplate,
  isApprovedTemplate,
  openTemplate,
  userTemplate,
} from './AdminTableTemplates';
import { createToast } from '../utils/toasts';
import NoData from './NoData';

const NewsAdmin: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const [deleteNews, { data: deleteData, error: deleteError }] =
    newsApiSlice.useDeleteNewsMutation();
  const [updateStatus, { error }] = newsApiSlice.useUpdateNewsStatusMutation();
  const { data, error: getListError, isLoading } = newsApiSlice.useGetAdminNewsListQuery<
    useGetQueryResponce<IResponcePaginatedData<IAdminItem>>
  >({
    page,
    limit,
  });

  useShowErrorToast(error);
  useShowErrorToast(getListError);
  useShowErrorToast(deleteError);

  useEffect(() => {
    if (deleteData) {
      createToast.success('Deleted');
    }
  }, [deleteData]);

  const history = useNavigate();

  const onDelete = (id: number) => {
    deleteNews(id);
  };

  const columns = [
    {
      field: 'id',
      header: 'ID',
    },
    {
      field: 'title',
      header: 'Title',
    },
    {
      field: 'user',
      header: 'User',
      template: (product: IAdminItem) => userTemplate<IAdminItem>(product),
    },
    {
      header: 'Approved',
      template: (product: IAdminItem) =>
        isApprovedTemplate<IAdminItem>(product, updateStatus),
    },
    {
      header: 'Open',
      template: (product: IAdminItem) =>
        openTemplate<IAdminItem>(product, history),
    },
    {
      header: 'Delete',
      template: (product: IAdminItem) =>
        deleteTemplate<IAdminItem>(product, onDelete),
    },
  ];

  return (
    <div>
      {data && <AdminTable<IAdminItem>
        columns={columns}
        values={data.items}
        title={'News'}
      />}
      {!data && !isLoading && <NoData />}
      <PaginationComponent
        page={{ current: page, setPage }}
        limit={{ current: limit, setLimit }}
        itemsCount={data?.itemCounts || 1}
      />
    </div>
  );
};

export default NewsAdmin;
