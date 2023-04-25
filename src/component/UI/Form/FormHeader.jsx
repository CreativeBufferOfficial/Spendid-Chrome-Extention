import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import classes from './FormHeader.module.css';
import zipIcon from '../../../assets/form/zipcode.png';
import ageIcon from '../../../assets/form/age.png';
import HouseHoldIcon from '../../../assets/form/household.png';
import homeTypeIcon from '../../../assets/form/hometype.png';
import mortgageIcon from '../../../assets/form/mortgage.png';
import vehicleIcon from '../../../assets/form/vehicle.png';
import obligationIcon from '../../../assets/form/obligation.png';
import ProgressBar from 'react-bootstrap/ProgressBar';

const FormHeader = () => {
  // const sliderSettings = {
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   infinite: false,
  // };
  const now = 60;

  const hotelCards = [
    {
      imageSrc: zipIcon,
      description: 'Zip Code',
    },
    {
      imageSrc: ageIcon,
      description: 'Age ',
    },
    {
      imageSrc: HouseHoldIcon,
      description: 'Household',
    },
    {
      imageSrc: homeTypeIcon,
      description: 'Home Type ',
    },

    {
      imageSrc: mortgageIcon,
      description: 'Rent/Mortgage ',
    },
    {
      imageSrc: vehicleIcon,
      description: 'Vechicles ',
    },
    {
      imageSrc: obligationIcon,
      description: 'Obligations ',
    },
  ];

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
        {hotelCards.map((card, index) => (
          <div className={classes.slide} key={index}>
            <img alt={card.title} src={card.imageSrc} />
            <p>{card.description}</p>
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
