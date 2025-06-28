import React from 'react';
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/request";

const Logo = ({ className, variant }) => {
  const { data, loading: fetchLoading } = useFetch("get_application_setting");
  if (fetchLoading) {
    return <img src="/images/logo.png" alt="One Off Autos" className={className} />;
  }
  const logoSrc = (variant === 'white' && data?.footer_logo) ? data.footer_logo : (data?.logo || '/images/logo.png');

  return (
    <Link to="/" className="flex items-center space-x-2">
      <img src={logoSrc} alt="One Off Autos" className={className} />
    </Link>
  );
};

export default Logo;
