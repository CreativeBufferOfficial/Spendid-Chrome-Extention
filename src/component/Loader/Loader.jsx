import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import classes from './Loader.module.css';
const Loader = () => {
  return (
    <div>
      <div className={classes.loader}>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </div>
    </div>
  );
};

export default Loader;
