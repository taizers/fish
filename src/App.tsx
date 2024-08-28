import { useEffect, FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './hooks';
import { setUserData, setUserToken } from './store/reducers/AuthSlice';
import { getToken } from './utils/localStorage';
import LayOut from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import AdminPanel from './pages/AdminPanel';
import News from './pages/News';
import Places from './pages/Places';
import './App.css';
import { getUserFromToken } from './utils';
import NewsItem from './pages/NewsItem';
import NewsAdminItem from './pages/NewsAdminItem';
import PlaceAdmin from './pages/PlaceAdmin';
import PrivateAdminRoute from './components/PrivateAdminRoute';

//TODO IAdminPalce fix naming
const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localToken = getToken();

    if (localToken) {
      const user = getUserFromToken(localToken);

      if (user) {
        dispatch(setUserToken(localToken));
        dispatch(setUserData(user));
      } else {
        dispatch(setUserData({}));
      }
    } else {
      dispatch(setUserData({}));
    }
  }, []);

  return (
    <Routes>
      <Route path={'/'} element={<LayOut />}>
        {/* public routes */}
        <Route index element={<Places />} />

        {/* protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path={'news'} element={<News />} />
          <Route path={'news/:id'} element={<NewsItem />} />
        </Route>

        <Route element={<PrivateAdminRoute />}>
          <Route path={'admin'} element={<AdminPanel />} />
          <Route path={'admin/place/:id'} element={<PlaceAdmin />} />
          <Route path={'admin/news/:id'} element={<NewsAdminItem />} />
        </Route>

        {/* Not Found route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
