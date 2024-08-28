import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { notFoundTextColor, notFoundButtonText, notFoundSubTitle, notFoundTitle } from '../constants';

const NotFound = () => {
  const history = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <p
        style={{ color: notFoundTextColor, fontSize: '26px' }}
        className="font-size-26 font-bold"
      >
        {notFoundTitle}
      </p>
      <p style={{ color: notFoundTextColor }} className="font-size-14 font-bold">
        {notFoundSubTitle}
      </p>
      <Button
        label={notFoundButtonText}
        onClick={() => history('/')}
        className="p-button font-bold"
      />
    </div>
  );
};

export default NotFound;
