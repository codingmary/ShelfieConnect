import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import './App.css';

//pages
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import BookShelf from './pages/BookShelf';
import WishList from './pages/WishList'


//layout
import RootLayout from './Layout/RootLayout';

import LoginModal from './pages/Login';







function App() {



  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<RootLayout />}>
  //       <Route index element={<Home />} />
  //       <Route path="about" element={<About />} />
  //       <Route path="signup" element={!user ? <SignUp /> : (<Navigate to="/bookshelf" />)} />
  //       <Route path="login" element={!user ? <LoginModal /> : (<Navigate to="/bookshelf" />)} />
  //       <Route path="bookshelf" element={user ? <BookShelf /> : (<Navigate to="/" />)} />
  //       <Route path="wishlist" element={user ? <WishList /> : (<Navigate to="/" />)} />
  //       <Route path="*" element={<NotFound />} />
  //     </Route>
  //   ))


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LoginModal />} />
        <Route path="bookshelf" element={<BookShelf />} />
        <Route path="wishlist" element={<WishList />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    ))



  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
