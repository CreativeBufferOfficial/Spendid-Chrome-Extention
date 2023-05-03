import React from 'react';

import classes from './FormHeader.module.css';

import ProgressBar from 'react-bootstrap/ProgressBar';
import tick from '../../../assets/form/tick.png';
import useFormContext from '../../../hooks/useFormContext';
const FormHeader = () => {
  const { page, title } = useFormContext();
  const now = page * 10;
  console.log('title>>>>>>>>>>>', +Object.keys(title[page])[0]);

  return (
    <>
      <div className={classes.slider_row}>
        {title.map((card, index) => (
          <div
            className={
              +Object.keys(title[page])[0] !== index
                ? +Object.keys(title[page])[0] > index
                  ? classes.slide_done
                  : classes.slide
                : classes.slide_active
            }
            key={index}
          >
            <img
              alt={card[index]}
              src={+Object.keys(title[page])[0] > index ? tick : card.imageSrc}
            />
            <p>{card[index]}</p>
          </div>
        ))}
      </div>
      <div className={classes.progress}>
        <ProgressBar
          now={now}
          label={`${now}%`}
          variant="bar_color"
          visuallyHidden
          height="1px"
          style={{
            height: '10px',
            margin: '10px 0px 10px 0px',
            backgroundColour: 'green',
          }}
        />
      </div>
    </>
  );
};

export default FormHeader;
