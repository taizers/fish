import { FC, useState } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import CommentsAdmin from "../components/CommentsAdmin";
import NewsAdmin from "../components/NewsAdmin";
import PlacesAdmin from "../components/PlacesAdmin";

type PagesLabelsType = 'Places' | 'News' | 'Comments';

const adminPages = {
  'Places': <PlacesAdmin /> , 
  'News': <NewsAdmin />, 
  'Comments': <CommentsAdmin />,
};

const AdminPanel: FC = () => {
  const pagesLabels = Object.keys(adminPages);
  const [page, setPage] = useState<PagesLabelsType>(pagesLabels[1] as PagesLabelsType);

  return (
    <div style={{ padding: '20px', overflowY: 'auto' }}>
      <div className="flex justify-content-center mb-4">
        <SelectButton
          value={page}
          onChange={(e) => setPage(e.value)}
          options={pagesLabels}
          allowEmpty={false}
          className="admin-panel-switch-button"
        />
      </div>
      {adminPages[page]}
    </div>
  );
};

export default AdminPanel;
