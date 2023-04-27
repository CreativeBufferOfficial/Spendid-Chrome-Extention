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
  // const title = {
  //   0: 'ZipCode',
  //   1: 'Age',
  //   2: 'HouseHold',
  //   3: 'HomeType',
  //   4: 'Rent',
  //   5: 'Vechicles',
  //   6: 'Obligations',
  //   7: 'Obligations',
  //   8: 'Health Insurance',
  //   9: 'Health Insurance',
  //   10: 'Take Home',
  // };

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
        net_annual_income: '',
      },

      budget: {
        other_debt_payments: '',
        mortgage_and_rent: '',
        vehicle_purchase_and_lease: '',
        health_insurance: '',
      },
    },

    // zip: '',
    // age: '',
    // household: '',
    // homeType: '',
    // rent: '',
    // vechicles: '',
    // obligations: {
    //   valid: '',
    //   value: {
    //     pastCreditCardDebt: '',
    //     studentLoans: '',
    //     homeEquityLineCredit: '',
    //     Alimony: '',
    //     childSupport: '',
    //     otherDebtPayments: '',
    //     total: '',
    //   },
    // },
    // healthInsurance: {
    //   valid: '',
    //   value: {
    //     insuranceAmount: '',
    //   },
    // },

    // takeHome: [
    //   { frequency: '', amount: '' },
    //   { frequency: '', amount: '' },
    // ],

    // {
    //   0: {
    //     frequency: '',
    //     amount: '',
    //   },
    //   1: {
    //     frequency: '',
    //     amount: '',
    //   },
    // },
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.getAttribute('name'));
    console.log(e.target.value);
    console.log('value', e.target.getAttribute('value'));

    const name = e.target.getAttribute('name');
    const value =
      e.target.value === undefined
        ? e.target.getAttribute('value')
        : e.target.value;

    // console.log(name);
    // console.log(value);
    switch (name) {
      case 'zip':
      case 'age':
      case 'household_members':
      case 'is_homeowner':
      case 'net_annual_income':
        setData((data) => ({
          apiReq: {
            ...data.apiReq,
            demographics: {
              ...data.apiReq.demographics,
              [name]: value,
            },
          },
        }));
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
              [name]: value,
            },
          },
        }));
        break;

      default:
      // ignore
    }
  };

  console.log('data>>>', data);

  //   useEffect(() => {
  //     if (data.sameAsBilling) {
  //       setData((prevData) => ({
  //         ...prevData,
  //         shipFirstName: prevData.billFirstName,
  //         shipLastName: prevData.billLastName,
  //         shipAddress1: prevData.billAddress1,
  //         shipAddress2: prevData.billAddress2,
  //         shipCity: prevData.billCity,
  //         shipState: prevData.billState,
  //         shipZipCode: prevData.billZipCode,
  //       }));
  //     } else {
  //       setData((prevData) => ({
  //         ...prevData,
  //         shipFirstName: '',
  //         shipLastName: '',
  //         shipAddress1: '',
  //         shipAddress2: '',
  //         shipCity: '',
  //         shipState: '',
  //         shipZipCode: '',
  //       }));
  //     }
  //   }, [data.sameAsBilling]);

  // const handleChange = (e) => {
  //   const type = e.target.type;

  //   const name = e.target.name;

  //   const value = type === 'checkbox' ? e.target.checked : e.target.value;

  //   setData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   console.log(e.target.innerText);
  //   console.log(e.target.name, e.target.value);

  //   setData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const { takeHome, ...requiredInputs } = data;

  const canSubmit =
    [...Object.values(requiredInputs)].every(Boolean) &&
    page === title.length - 1;

  //TODO: When input is filled to required length and other condition when all input value is set for all page condition
  const canNextPage1 = Object.keys(data)
    .filter((key) => key.startsWith('bill') && key !== 'billAddress2')
    .map((key) => data[key])
    .every(Boolean);

  const canNextPage2 = Object.keys(data)
    .filter((key) => key.startsWith('ship') && key !== 'shipAddress2')
    .map((key) => data[key])
    .every(Boolean);

  const disablePrev = page === 0;

  const disableNext =
    page === title.length - 1 ||
    (page === 0 && !canNextPage1) ||
    (page === 1 && !canNextPage2);

  const prevHide = page === 0 && classes.removeButton;

  const nextHide = page === title.length - 1 && classes.removeButton;

  const submitHide = page !== title.length - 1 && classes.removeButton;

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
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        submitHide,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
