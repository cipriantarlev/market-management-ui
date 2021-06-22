import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="main-content not-found">
    <i className="material-icons icn-error">error_outline</i>
    <h2>Page Not Found</h2>
    <Link to="/">Go Home</Link>
  </div>
);

export default NotFound;