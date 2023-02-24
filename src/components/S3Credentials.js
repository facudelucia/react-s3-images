import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';

function S3Credentials() {

  const [form, setForm] = useState({
    accessKey: '',
    secretKey: '',
    bucketName: '',
    region: ''
  })

  const { accessKey, secretKey, bucketName, region } = form

  const navigate = useNavigate();

  const { login } = useContext(Context)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const lastPath = localStorage.getItem('lastPath') || '/';
    if (accessKey === '' || secretKey === '' || bucketName === '' || region === '') {
      return
    } else {
      login({
        accessKey,
        secretKey,
        bucketName,
        region
      })
      navigate(lastPath, {
        replace: true
      });
    }
  }

  return (
    <div className="container">
      <h1 className="mt-4">AWS S3 Credentials</h1>
      <form className="mt-4" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="accessKey">Access Key:</label>
          <input type="text" className="form-control" id="accessKey" name="accessKey" value={accessKey} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="secretKey">Secret Key:</label>
          <input type="text" className="form-control" id="secretKey" name="secretKey" value={secretKey} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="bucketName">Bucket Name:</label>
          <input type="text" className="form-control" id="bucketName" name="bucketName" value={bucketName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="region">Region:</label>
          <input type="text" className="form-control" id="region" name="region" value={region} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}

export default S3Credentials;