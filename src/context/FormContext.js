import { createContext, useState } from 'react';
import zipIcon from '../assets/form/zipcode.png';
import ageIcon from '../assets/form/age.png';
import HouseHoldIcon from '../assets/form/household.png';
import homeTypeIcon from '../assets/form/hometype.png';
import rentIcon from '../assets/form/rent.png';
import vehicleIcon from '../assets/form/vehicle.png';
import obligationIcon from '../assets/form/obligation.png';
import healthcareIcon from '../assets/form/healthcare.png';
import incomeIcon from '../assets/form/income.png';

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

  const [data, setData] = useState({
    apiReq: {
      demographics: {
        zip: '',
        age: '',
        household_members: '',
        is_homeowner: '',
        net_annual_income: '',
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

  const [globalSelectedIndex, setGlobalSelectedIndex] = useState(
    Array(10).fill(-1)
  );
  const [page, setPage] = useState(0);

  const updateState = (name, value) => {
    const keyname = name;

    switch (keyname) {
      case 'net_annual_income':
        setData({
          ...data,
          apiReq: {
            ...data.apiReq,
            demographics: {
              ...data.apiReq.demographics,
              [keyname]: +value,
            },
          },
        });

        break;

      case 'other_debt_payments':
        setData({
          ...data,
          apiReq: {
            ...data.apiReq,
            budget: {
              ...data.apiReq.budget,
              [keyname]: +value || null,
            },
          },
        });

        break;

      default:
    }
  };

  const handleChange = (e, i) => {
    if (i !== -1) {
      globalSelectedIndex[page] = i;
      setGlobalSelectedIndex(globalSelectedIndex);
    } else {
      globalSelectedIndex[page] = 0;
      setGlobalSelectedIndex(globalSelectedIndex);
    }

    const name = e.target.getAttribute('name');
    const value =
      e.target.value === undefined
        ? e.target.getAttribute('value')
        : e.target.value;

    switch (name) {
      case 'zip':
      case 'age':
      case 'net_annual_income':
        setData((data) => ({
          apiReq: {
            ...data.apiReq,
            demographics: {
              ...data.apiReq.demographics,
              [name]: +value,
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
          setTimeout(() => {
            setPage((prev) => prev + 1);
          }, 300);
        } else if (value === 'No') {
          setTimeout(() => {
            setPage((prev) => prev + 2);
          }, 300);
        }

        break;

      default:
    }
  };

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
        handleChange,
        prevRedirectHome,
        nextHide,
        submitHide,
        nextHandler,
        prevHandler,
        currentHandler,
        updateState,
        globalSelectedIndex,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
