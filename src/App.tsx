import { useEffect, FC } from 'react';
import type { LoaderFunctionArgs } from "react-router-dom";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from './hooks';
import { setUserData, setUserToken } from './store/reducers/AuthSlice';
import { getToken } from './utils/localStorage';
import LayOut from './components/Layout';
import NotFound from './pages/NotFound';
import AdminPanel from './pages/AdminPanel';
import News from './pages/News';
import Places from './pages/Places';
import { getUserFromToken } from './utils';
import NewsItem from './pages/NewsItem';
import NewsAdminItem from './pages/NewsAdminItem';
import PlaceAdmin from './pages/PlaceAdmin';
import Loader from './components/Loader.tsx';
import { adminRole, moderatorRole } from './constants.ts';

import './App.css';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const localToken = getToken();
    const userFromToken = getUserFromToken(localToken);

    dispatch(setUserToken(localToken));
    dispatch(setUserData(userFromToken));
  }, []);

  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      Component: LayOut,
      children: [
        {
          index: true,
          Component: Places,
        },
        {
          path: "news",
          loader: protectedLoader,
          Component: News,
        },
        {
          path: "news/:id",
          loader: protectedLoader,
          Component: NewsItem,
        },
        {
          path: "admin",
          loader: (request) => protectedByRolesLoader(request, [adminRole, moderatorRole]),
          Component: AdminPanel,
        },
        {
          path: "admin/place/:id",
          loader: (request) => protectedByRolesLoader(request, [adminRole, moderatorRole]),
          Component: PlaceAdmin,
        },
        {
          path: "admin/news/:id",
          loader: (request) => protectedByRolesLoader(request, [adminRole, moderatorRole]),
          Component: NewsAdminItem,
        },
        {
          path: "*",
          Component: NotFound,
        },
      ],
    }
  ]);

  function protectedByRolesLoader({ request }: LoaderFunctionArgs, roles: string[]) {
    const isUserHaveRole = roles.some(item => {
      return user?.roles?.includes(item)
    });

    if (user === null || isUserHaveRole) {
      return null;
    }

    if (user.login) {
      return redirect("/");
    }

    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/?" + params.toString());
  }

  function protectedLoader({ request }: LoaderFunctionArgs) {
    if (user === null || user.login) {
      return null;
    }

    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/?" + params.toString());
  }

  return (
    <RouterProvider router={router} fallbackElement={<Loader />} />
  );
};

export default App;
