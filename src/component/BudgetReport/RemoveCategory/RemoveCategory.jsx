import React from 'react';
import classes from './RemoveCategory.module.css';
const RemoveCategory = ({
  index,
  title,
  amount1,
  amount2,
  onRestoreCategory,
}) => {
  return (
    <>
      <div className={classes.remove_category}>
        <div className={classes.title}>
          <p>{title}</p>
          <button
            className={classes.restore_btn}
            onClick={() => onRestoreCategory(index)}
          >
            Restore
          </button>
        </div>
        <div className={classes.amount_labels}>
          <p
            style={{
              backgroundColor:
                title === localStorage.getItem(title) ? '#0267e8' : '#180f4f',
            }}
          >
            ${amount1}
          </p>{' '}
          <p>${amount2}</p>
        </div>
      </div>
    </>
  );
};

export default RemoveCategory;
