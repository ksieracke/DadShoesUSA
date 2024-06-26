import React, { useEffect } from 'react';

import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import PurchasePage from '../PurchasePage/PurchasePage';
import GalleryPage from '../GalleryPage/GalleryPage';
import UploadPage from '../UploadPage/UploadPage';
import AdminUploadPage from '../AdminUploadPage/AdminUploadPage';
import CheckoutPage from '../CheckoutPage/CheckoutPage';
import './App.css';
import ThankYouPage from '../ThankYouPage/ThankYouPage';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);




  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {/* {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              : 
              // Otherwise, show the Landing page*/}
              <LandingPage />
            {/* } */}
          </Route>
          <Route exact
          path="/purchase">
            <PurchasePage />
          </Route>

          <Route exact
          path="/gallery">
            <GalleryPage />
          </Route>

          <ProtectedRoute exact
          path="/upload">
            <UploadPage />
          </ProtectedRoute>

          <ProtectedRoute exact
          path="/upload/admin">
            {user.user_type === 'Admin' ? <AdminUploadPage /> : <Redirect to="/" />} 
          </ProtectedRoute>

          <Route exact
          path="/checkout">
            <CheckoutPage />
          </Route>

          <Route exact
          path="/thankyou">
            <ThankYouPage />
          </Route>

          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
