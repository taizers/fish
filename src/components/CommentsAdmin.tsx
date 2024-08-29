import { FC, useEffect, useState } from 'react';
import AdminTable from './AdminTable';
import PaginationComponent from './Pagination';
import {
  IAdminComment,
  IResponcePaginatedData,
  useGetQueryResponce,
} from '../types/responce';
import { commentsApiSlice } from '../store/reducers/CommentsApiSlice';
import { useShowErrorToast } from '../hooks';
import {
  DeleteTemplate,
  GradeTemplate,
  UserTemplate,
} from './AdminTableTemplates';
import { createToast } from '../utils/toasts';
import NoData from './NoData';
import Loader from './Loader';
import { defaultPaginationPage, defaultPaginationLimit } from '../constants';

const CommentsAdmin: FC = () => {
  const [page, setPage] = useState<number>(defaultPaginationPage);
  const [limit, setLimit] = useState<number>(defaultPaginationLimit);

  const [deleteComment, { data: deleteData, error: deleteError }] =
    commentsApiSlice.useCreateCommentMutation();
  const { data, error, isLoading } = commentsApiSlice.useGetAdminCommentsQuery<
    useGetQueryResponce<IResponcePaginatedData<IAdminComment>>
  >({
    page,
    limit,
  });

  useEffect(() => {
    if (deleteData) {
      createToast.success('Deleted');
    }
  }, [deleteData]);

  const onDelete = (id: number) => {
    deleteComment(id);
  };

  useShowErrorToast(error);
  useShowErrorToast(deleteError);

  const columns = [
    {
      field: 'id',
      header: 'ID',
    },
    {
      field: 'text',
      header: 'Text',
    },
    {
      field: 'grade',
      header: 'Grade',
      template: (product: IAdminComment) =>
        GradeTemplate<IAdminComment>(product),
    },
    {
      field: 'user',
      header: 'User',
      template: (product: IAdminComment) =>
        UserTemplate<IAdminComment>(product),
    },
    {
      header: 'Delete',
      template: (product: IAdminComment) =>
        DeleteTemplate<IAdminComment>(product, onDelete),
    },
  ];

  return (
    <div>
      {data && (
        <AdminTable<IAdminComment>
          columns={columns}
          values={data.items}
          title={'Cooments'}
        />
      )}
      {!data && !isLoading && <NoData />}
      {isLoading && <Loader />}
      <PaginationComponent
        page={{ current: page, setPage }}
        limit={{ current: limit, setLimit }}
        itemsCount={data?.itemCounts || 1}
      />
    </div>
  );
};

export default CommentsAdmin;
