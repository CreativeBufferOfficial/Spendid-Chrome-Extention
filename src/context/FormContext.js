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
import { useSelector } from 'react-redux';

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
  const [netIncome, setNetIncome] = useState([{ frequency: '', amount: 0 }]);

  const [data, setData] = useState({
    apiReq: {
      demographics: {
        zip: 14001,
        age: 25,
        household_members: 4,
        is_homeowner: false,
        net_annual_income: 40000,
      },
      budget: {
        savings: null,
        other_debt_payments: null,
        mortgage_and_rent: 100,
        vehicle_purchase_and_lease: 100,
        health_insurance: 100,
      },
    },
  });

  const lendingPayload = {
    budget: {
      ...data.apiReq.budget,
      education: 0,
      life_and_personal_insurance: 0,
      personal_services: 0,
      public_and_other_transportation: 0,
    },
    demographics: { ...data.apiReq.demographics },
  };
  const demographicsPayload = {
    demographics: { ...data.apiReq.demographics },
    transformer: {
      alcoholic_beverages: 'Groceries',
      cash_contributions: 'Charitable Giving',
      clothing_items_and_services: 'Clothing & Jewelry',
      education: 'Education',
      electricity: 'Utilities - Power Bill',
      fees_and_admissions: 'Fun & Leisure',
      food_home: 'Groceries',
      food_out: 'Dining Out',
      furniture_and_appliances: 'Home Appliances & Furniture',
      gasoline: 'Gasoline & EV-Charging',
      health_insurance: 'Health Insurance',
      heating_fuels_other: 'Utilities - Other',
      home_maintenance_and_repairs: 'Home Maintenance & Services',
      housekeeping_supplies: 'Home Maintenance & Services',
      life_and_personal_insurance: 'Life & Other Personal Insurance',
      media_hardware_and_services: 'Cable / Internet / Streaming',
      medical_services: 'Medical Spending',
      medical_supplies: 'Medical Spending',
      miscellaneous: 'Miscellaneous',
      mortgage_and_rent: 'Rent or Mortgage Payment',
      natural_gas: 'Utilities - Other',
      other_debt_payments: 'Other Debt Payments & Obligations',
      other_household_expenses: 'Home Maintenance & Services',
      other_lodging: 'Vacation & Other Lodging',
      personal_care: 'Personal Care Products and Services',
      personal_services: 'Babysitting / Preschool / Eldercare',
      pets: 'Pets',
      prescription_drugs: 'Medical Spending',
      public_and_other_transportation: 'Transportation Fares',
      reading: 'Miscellaneous',
      savings: 'Amount to Savings Each Period',
      telephone_services: 'Phone Services',
      tobacco_and_smoking: 'Miscellaneous',
      toys_and_hobbies: 'Fun & Leisure',
      vehicle_insurance: 'Car Insurance',
      vehicle_maintenance_and_repairs: 'Car Maintenance',
      vehicle_purchase_and_lease: 'Car Payments',
      water_and_public_services: 'Utilities - Other',
    },
  };
  const budgetPayload = {
    budget: { ...data.apiReq.budget },
    demographics: { ...data.apiReq.demographics },
    transformer: {
      alcoholic_beverages: 'Groceries',
      cash_contributions: 'Charitable Giving',
      clothing_items_and_services: 'Clothing & Jewelry',
      education: 'Education',
      electricity: 'Utilities - Power Bill',
      fees_and_admissions: 'Fun & Leisure',
      food_home: 'Groceries',
      food_out: 'Dining Out',
      furniture_and_appliances: 'Home Appliances & Furniture',
      gasoline: 'Gasoline & EV-Charging',
      health_insurance: 'Health Insurance',
      heating_fuels_other: 'Utilities - Other',
      home_maintenance_and_repairs: 'Home Maintenance & Services',
      housekeeping_supplies: 'Home Maintenance & Services',
      life_and_personal_insurance: 'Life & Other Personal Insurance',
      media_hardware_and_services: 'Cable / Internet / Streaming',
      medical_services: 'Medical Spending',
      medical_supplies: 'Medical Spending',
      miscellaneous: 'Miscellaneous',
      mortgage_and_rent: 'Rent or Mortgage Payment',
      natural_gas: 'Utilities - Other',
      other_debt_payments: 'Other Debt Payments & Obligations',
      other_household_expenses: 'Home Maintenance & Services',
      other_lodging: 'Vacation & Other Lodging',
      personal_care: 'Personal Care Products and Services',
      personal_services: 'Babysitting / Preschool / Eldercare',
      pets: 'Pets',
      prescription_drugs: 'Medical Spending',
      public_and_other_transportation: 'Transportation Fares',
      reading: 'Miscellaneous',
      savings: 'Amount to Savings Each Period',
      telephone_services: 'Phone Services',
      tobacco_and_smoking: 'Miscellaneous',
      toys_and_hobbies: 'Fun & Leisure',
      vehicle_insurance: 'Car Insurance',
      vehicle_maintenance_and_repairs: 'Car Maintenance',
      vehicle_purchase_and_lease: 'Car Payments',
      water_and_public_services: 'Utilities - Other',
    },
  };

  const scorePayload = {
    demographics: { ...data.apiReq.demographics },
    budget: { ...data.apiReq.budget },
  };

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
        lendingPayload,
        budgetPayload,
        demographicsPayload,
        scorePayload,
        netIncome,
        setNetIncome,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
