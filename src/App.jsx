import React from 'react';

import Home from './pages/Home';
import History from './pages/History';
import Insight from './pages/Insight';
import More from './pages/More';
import Stats from './pages/Stats';
import Login from './pages/login';
import Signup from './pages/signup';
import Landing from './pages/Landingpage';
import ProtectedRoute from './components/ProtectedRoute';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { useEffect } from 'react';
import { handleGoogleRedirect } from './services/auth';

function App() {
  useEffect(() => {
    handleGoogleRedirect();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/insight"
          element={
            <ProtectedRoute>
              <Insight />
            </ProtectedRoute>
          }
        />

        <Route
          path="/more"
          element={
            <ProtectedRoute>
              <More />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <Stats />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
