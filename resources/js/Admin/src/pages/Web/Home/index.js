import React from 'react'
import { useNavigate } from 'react-router-dom'; // ← import useNavigate
import ContentWrapper from '../../../components/shared/contentWrapper';
import { Button } from "antd";

const HomePage = () => {
  const navigate = useNavigate(); // ← initialize the hook

  const handleRedirect = () => {
    navigate('/admin/login/zekkmdvhkm'); // ← change this path to your target route
  };

  return (
    <section className="main-content d-flex align-items-center justify-content-center min-vh-100">
      <div className='row'>
        <div className="col-sm-12 vv text-center">
          <h1>Welcome to One-Off-Auto</h1>
        </div>
        <div className="col-sm-12 vv text-center">
        </div>
      </div>
    </section>
  );
}

export default React.memo(HomePage);
