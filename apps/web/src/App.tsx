import './styles/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { SignIn } from './pages/SignIn';
import { NotFound } from './pages/404';
import { RequireAuth } from 'lib/RequireAuth';
import { Admin, Manager } from 'pages';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { me } from 'app/features/user/userSlice';
import { Loading } from 'components/Loading';

function App() {
  const dispatch = useAppDispatch();

  const userPromise = useAppSelector(({ user }) => user);

  useEffect(() => {
    dispatch(me());
  }, []);

  if (userPromise.status !== 'fulfilled') {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route path='/Signin' element={<SignIn />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/manager/*' element={<Manager />} />
        <Route path='/' element={<Home />} />
        <Route element={<RequireAuth redirectTo='/' Role='ADMIN' />}>
          <Route path='about' element={<About />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
