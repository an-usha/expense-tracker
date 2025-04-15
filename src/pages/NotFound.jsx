import React from 'react';
import "../styles/NotFound.css";
import { MdErrorOutline } from "react-icons/md";

const NotFound = () => {
  return (
    <div className='notfound-container'>
      <div className='notfound'>
        <MdErrorOutline size="5rem"/>
      </div>
        <h1 className='notfound'>
            404 - Page Not Found
        </h1>
    </div>
  )
}

export default NotFound