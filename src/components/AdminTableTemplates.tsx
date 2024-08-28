import { Button } from 'primereact/button';
import { IShortItem } from '../types/responce';
import { NavigateFunction } from 'react-router-dom';
import { Rating } from 'primereact/rating';
import DeleteModal from '../modals/DeleteModal';

export const UserTemplate = <T extends { user: IShortItem }>(product: T) => {
  return (
    <>
      `${product.user.name}(${product.user.id})`
    </>
  );
};

export const IsApprovedTemplate = <T extends { status: string; id: number }>(
  product: T,
  updateStatus: (data: object) => void
) => {
  if (product.status !== 'одобрено') {
    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <span className="pi pi-check-circle"></span>
      </div>
    );
  } else {
    return (
      <Button
        label="Approve"
        onClick={() => updateStatus({ id: product.id, status: 'одобрено' })}
        style={{ width: '100%' }}
        text
        className="p-button font-bold"
      ></Button>
    );
  }
};

export const OpenTemplate = <T extends { id: number }>(
  product: T,
  history: NavigateFunction
) => {
  return (
    <Button
      label="Open"
      link
      onClick={() => history(`/admin/news/${product.id}`)}
    />
  );
};

export const DeleteTemplate = <T extends { id: number }>(
  product: T,
  onDelete: (id: number) => void
) => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <DeleteModal
        deleteFunction={() => onDelete(product.id)}
        deleteIcon="pi-trash"
      />
    </div>
  );
};

export const GradeTemplate = <T extends { grade: number }>(product: T) => {
  return <Rating value={product.grade} readOnly cancel={false} />;
};
