import React from 'react'
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';
import logoWhiteRed from '../../images/logo-white-red.png';

const Logo = ({className, variant}) => {
  const logoSrc = variant === 'white' ? logoWhiteRed : logo;
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img src={logoSrc} alt="One Off Autos" className={className} />
    </Link>
  )
}

export default Logo
