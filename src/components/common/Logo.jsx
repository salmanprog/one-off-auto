import React from 'react'
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';

const Logo = ({className}) => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img src={logo} alt="One Off Autos" className={className} />
    </Link>
  )
}

export default Logo
