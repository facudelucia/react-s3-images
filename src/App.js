import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ImageList from './components/ImageList';
import UploadImage from './components/UploadImage';
import { PrivateRoute } from './components/PrivateRoute';
import S3Credentials from './components/S3Credentials';
import { Provider } from './context/Provider';

function App() {

  return (
    <Provider>
      <div>
        <Routes>
          <Route path="login" element={<S3Credentials />} />
          <Route path="/" element={
            <PrivateRoute>
              <UploadImage />
              <ImageList />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
