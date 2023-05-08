import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import classes from './Loader.module.css';
const Loader = () => {
  return (
    <>
      <div className={classes.loader}>
        <div>
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
        </div>
      </div>
    </>
  );
};

export default Loader;
