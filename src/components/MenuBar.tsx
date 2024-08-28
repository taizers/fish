import { FC, ReactNode } from 'react';
import { Menubar as Menu } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { adminRole, moderatorRole } from '../constants.ts';

interface IMEnuBar {
  setLoginDialogVisible: (data: boolean) => void;
  child: ReactNode;
}

const MenuBar: FC<IMEnuBar> = ({ setLoginDialogVisible, child }) => {
  const history = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const end = (
    <div className="flex align-items-center gap-2">
      {user === null || !user.login ? (
        <Button
          label="Login"
          icon="pi pi-user"
          onClick={() => setLoginDialogVisible(true)}
        />
      ) : (
        <p style={{ marginRight: '10px' }}>{`${user.name}`}</p>
      )}
    </div>
  );

  const items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => history('/'),
    },
  ];

  if (user?.login) {
    items.push({
      label: 'News',
      icon: 'pi pi-table',
      command: () => history('/news'),
    });
  }

  if (
    user?.roles?.includes(adminRole) ||
    user?.roles?.includes(moderatorRole)
  ) {
    items.push({
      label: 'Admin toolbar',
      icon: 'pi pi-star',
      command: () => history('/admin'),
    });
  }

  return (
    <div style={{ height: '100%' }}>
      <Menu  className="menu-bar" model={items} end={end} />
      <div className="app-item">{child}</div>
    </div>
  );
};

export default MenuBar;
