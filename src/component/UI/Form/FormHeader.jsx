import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import classes from './FormHeader.module.css';
import zipIcon from '../../../assets/form/zipcode.png';
import ageIcon from '../../../assets/form/age.png';
import HouseHoldIcon from '../../../assets/form/household.png';
import homeTypeIcon from '../../../assets/form/hometype.png';
import rentIcon from '../../../assets/form/rent.png';
import vehicleIcon from '../../../assets/form/vehicle.png';
import obligationIcon from '../../../assets/form/obligation.png';
import healthcareIcon from '../../../assets/form/healthcare.png';
import incomeIcon from '../../../assets/form/income.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import useFormContext from '../../../hooks/useFormContext';
const FormHeader = () => {
  const { page, title } = useFormContext();
  // const sliderSettings = {
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   infinite: false,
  // };
  const now = 60;

  // const hotelCards = [
  //   {
  //     imageSrc: zipIcon,
  //     description: 'ZipCode',
  //   },
  //   {
  //     imageSrc: ageIcon,
  //     description: 'Age ',
  //   },
  //   {
  //     imageSrc: HouseHoldIcon,
  //     description: 'HouseHold',
  //   },
  //   {
  //     imageSrc: homeTypeIcon,
  //     description: 'HomeType ',
  //   },

  //   {
  //     imageSrc: rentIcon,
  //     description: 'Rent ',
  //   },
  //   {
  //     imageSrc: vehicleIcon,
  //     description: 'Vechicles ',
  //   },
  //   {
  //     imageSrc: obligationIcon,
  //     description: 'Obligations ',
  //   },
  //   {
  //     imageSrc: healthcareIcon,
  //     description: 'Health Insurance ',
  //   },
  //   {
  //     imageSrc: incomeIcon,
  //     description: 'Take Home ',
  //   },
  // ];
  // console.log('title>>>>>>>>>>>', title[page]);
  console.log('title>>>>>>>>>>>', +Object.keys(title[page])[0]);

  return (
    // <div className={classes.content}>
    //   <Slider {...sliderSettings}>
    //     {hotelCards.map((card, index) => (
    //       <div className={classes.slide} key={index}>
    //         <img alt={card.title} src={card.imageSrc} />
    //         <p>{card.description}</p>
    //       </div>
    //     ))}
    //   </Slider>
    // </div>

    <>
      <div className={classes.slider_row}>
        {title.map((card, index) => (
          <div
            className={
              // title[page]
              +Object.keys(title[page])[0] !== index
                ? classes.slide
                : classes.slide_active
            }
            key={index}
          >
            <img alt={card[index]} src={card.imageSrc} />
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
        />
      </div>
    </>
  );
};

export default FormHeader;
