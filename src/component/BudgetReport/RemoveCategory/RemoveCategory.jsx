import React from 'react';
import classes from './RemoveCategory.module.css';
import useFormContext from '../../../hooks/useFormContext';

const RemoveCategory = ({
  index,
  title,
  amount1,
  amount2,
  onRestoreCategory,
}) => {
  const { transformData } = useFormContext();
  const filter = transformData.filter((obj) => obj.name === title);
  return (
    <>
      <div className={classes.remove_category}>
        <div className={classes.title}>
          <p>{title}</p>
          <button
            name={filter[0].payloadName}
            className={classes.restore_btn}
            onClick={() => onRestoreCategory(index, filter[0].payloadName)}
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
