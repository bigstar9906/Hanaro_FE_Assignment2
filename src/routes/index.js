import { useRoutes, Navigate } from 'react-router-dom';
// Layouts
import Header from '../layout/Header'; 
// Pages
import AlbumList from '../views/AlbumList';
import AlbumDetail from '../views/AlbumDetail';
import Login from '../views/Login';
import NotFound from '../views/NotFound';
import { useLogin } from '../state/UserContext';
import { useAlbum } from '../state/AlbumContext';


export default function Routes() {
  const { state } = useLogin();
  const { albumState } = useAlbum();
  const isLoggedIn = state.user !== null; // 로그인 상태가 아닐 시 로그인 페이지로 이동
  const isSelected = albumState.selectedAlbum !== null; // 선택된 앨범이 없을 시 404 페이지로 이동

  return useRoutes([
    {
      path: '/',
      element: <Header/>,
      children:
        [
          // Navigator : 로그인 여부에 따라 album 페이지로 이동하거나 login 페이지로 이동
          {path: '/', element: isLoggedIn ? <Navigate to="/album" /> : <Navigate to="/login" />},
          {path: 'album', element: isLoggedIn ? <AlbumList /> : <Navigate to="/login" />},
          {path: 'album/detail', element: isLoggedIn ? isSelected ?<AlbumDetail /> :<Navigate to={'/album'}/> : <Navigate to="/login" />},
          {path: 'login', element: <Login />},
          {path: '*', element: <Navigate to="/404" />}
        ]
    },
    {
      path:'404',
      element: <NotFound />
    }
  ]);
}
