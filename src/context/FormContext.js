import { createContext, useState, useEffect } from 'react';
import zipIcon from '../assets/form/zipcode.png';
import ageIcon from '../assets/form/age.png';
import HouseHoldIcon from '../assets/form/household.png';
import homeTypeIcon from '../assets/form/hometype.png';
import rentIcon from '../assets/form/rent.png';
import vehicleIcon from '../assets/form/vehicle.png';
import obligationIcon from '../assets/form/obligation.png';
import healthcareIcon from '../assets/form/healthcare.png';
import incomeIcon from '../assets/form/income.png';
import classes from '../pages/Dashboard/Form/Form.module.css';

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const title = [
    {
      0: 'ZipCode',
      imageSrc: zipIcon,
    },
    {
      1: 'Age ',
      imageSrc: ageIcon,
    },
    {
      2: 'HouseHold',
      imageSrc: HouseHoldIcon,
    },
    {
      3: 'HomeType ',
      imageSrc: homeTypeIcon,
    },
    {
      4: 'Rent ',
      imageSrc: rentIcon,
    },
    {
      5: 'Vechicles ',
      imageSrc: vehicleIcon,
    },
    {
      6: 'Obligations ',
      imageSrc: obligationIcon,
    },
    {
      7: 'Obligations ',
      imageSrc: obligationIcon,
    },
    {
      8: 'Health Insurance ',
      imageSrc: healthcareIcon,
    },
    {
      9: 'Health Insurance ',
      imageSrc: healthcareIcon,
    },
    {
      10: 'Take Home ',
      imageSrc: incomeIcon,
    },
  ];

  const [page, setPage] = useState(0);

  const [data, setData] = useState({
    apiReq: {
      demographics: {
        zip: '',
        age: '',
        household_members: '',
        is_homeowner: '',
        net_annual_income: 40000,
      },
      budget: {
        savings: null,
        other_debt_payments: null,
        mortgage_and_rent: '',
        vehicle_purchase_and_lease: '',
        health_insurance: '',
      },
    },
  });

  const handleChange = (e, name2, value2) => {
    console.log(e.target.name);
    console.log(e.target.getAttribute('name'));
    console.log(e.target.value);
    console.log('value', e.target.getAttribute('value'));

    const name = e.target.getAttribute('name');
    const value =
      e.target.value === undefined
        ? e.target.getAttribute('value')
        : e.target.value;
    const selected = e.target;

    switch (name || name2) {
      case 'zip':
      case 'age':
      case 'net_annual_income':
        setData((data) => ({
          apiReq: {
            ...data.apiReq,
            demographics: {
              ...data.apiReq.demographics,
              [name]: +value || +value2,
            },
          },
        }));

        break;

      case 'household_members':
      case 'is_homeowner':
        setData((data) => ({
          apiReq: {
            ...data.apiReq,
            demographics: {
              ...data.apiReq.demographics,
              [name]: name === 'household_members' ? +value : JSON.parse(value),
            },
          },
        }));
        selected.parentElement.style.border = '1px solid #31bfaa';
        selected.children[0].style.display = 'block';
        setTimeout(() => {
          setPage((prev) => prev + 1);
        }, 300);
        break;

      case 'other_debt_payments':
      case 'mortgage_and_rent':
      case 'vehicle_purchase_and_lease':
      case 'health_insurance':
        setData((data) => ({
          apiReq: {
            ...data.apiReq,
            budget: {
              ...data.apiReq.budget,
              [name]: +value,
            },
          },
        }));
        break;

      case 'isHealthInsured':
      case 'isOtherDept':
        if (value === 'Yes') {
          selected.parentElement.style.border = '1px solid #31bfaa';
          selected.children[0].style.display = 'block';

          setTimeout(() => {
            setPage((prev) => prev + 1);
          }, 300);
        } else if (value === 'No') {
          selected.parentElement.style.border = '1px solid #31bfaa';
          selected.children[0].style.display = 'block';

          setTimeout(() => {
            setPage((prev) => prev + 2);
          }, 300);
        }

        break;

      default:
      // ignore
    }
  };

  console.log('data>>>', data);

  const { takeHome, ...requiredInputs } = data;

  const canSubmit =
    [...Object.values(requiredInputs)].every(Boolean) &&
    page === title.length - 1;

  //TODO: When input is filled to required length and other condition when all input value is set for all page condition
  // const canNextPage1 = Object.keys(data)
  //   .filter((key) => key.startsWith('bill') && key !== 'billAddress2')
  //   .map((key) => data[key])
  //   .every(Boolean);

  // const canNextPage2 = Object.keys(data)
  //   .filter((key) => key.startsWith('ship') && key !== 'shipAddress2')
  //   .map((key) => data[key])
  //   .every(Boolean);

  // const disablePrev = page === 0;

  // const disableNext =
  //   page === title.length - 1 ||
  //   (page === 0 && !canNextPage1) ||
  //   (page === 1 && !canNextPage2);

  const prevRedirectHome = page === 0;

  const nextHide = page === title.length - 1;

  const submitHide = page !== title.length - 1;

  const nextHandler = () => setPage((prev) => prev + 1);
  const prevHandler = () => setPage((prev) => prev - 1);
  const currentHandler = () => setPage((prev) => prev);

  return (
    <FormContext.Provider
      value={{
        title,
        page,
        setPage,
        data,
        setData,
        canSubmit,
        handleChange,
        // disablePrev,
        // disableNext,
        prevRedirectHome,
        nextHide,
        submitHide,
        nextHandler,
        prevHandler,
        currentHandler,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
