import React from 'react';
import classes from './FormHeader.module.css';
import tick from '../../../assets/form/tick.png';
import useFormContext from '../../../hooks/useFormContext';
import Progressbar from './Progress';
const FormHeader = () => {
  const { page, title } = useFormContext();
  const now = page * 10;

  return (
    <>
      <div className={classes.slider_row}>
        {title.map((card, index) => (
          <div
            style={{
              display:
                index < title.length - 1 &&
                  title[index].imageSrc === title[index + 1].imageSrc
                  ? 'none'
                  : 'block',
            }}
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
        <Progressbar bgcolor="#30BDA9" progress={now} height={10} />
      </div>
    </>
  );
};

export default FormHeader;
