import React from 'react';
import useFormContext from '../../../hooks/useFormContext';
import Zip from './FormPages/Zip';
import Age from './FormPages/Age';
import HouseHold from './FormPages/HouseHold';
import HomeType from './FormPages/HomeType';
import Rent from './FormPages/Rent';
import Vechicles from './FormPages/Vechicles';
import Obligations from './FormPages/Obligations';
import Obligations2 from './FormPages/Obligations2';
import HealthInsurance from './FormPages/HealthInsurance';
import HealthInsurance2 from './FormPages/HealthInsurance2';
import TakeHome from './FormPages/TakeHome';

const FormInput = () => {
  const { page } = useFormContext();

  const display = {
    0: <Zip />,
    1: <Age />,
    2: <HouseHold />,
    3: <HomeType />,
    4: <Rent />,
    5: <Vechicles />,
    6: <Obligations />,
    7: <Obligations2 />,
    8: <HealthInsurance />,
    9: <HealthInsurance2 />,
    10: <TakeHome />,
  };

  const content = <div>{display[page]}</div>;

  return content;
};

export default FormInput;
