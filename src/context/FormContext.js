import { createContext, useState } from 'react';
import {
  zipIcon,
  ageIcon,
  HouseHoldIcon,
  homeTypeIcon,
  rentIcon,
  vehicleIcon,
  obligationIcon,
  healthcareIcon,
  incomeIcon,
} from '../utlis/Imports';
import { getStructureTransform } from '../utlis/Helper';

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

  const transformerData = {
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
  };

  const strutureTransformData = getStructureTransform(transformerData);
  // console.log('strutureTransformData', strutureTransformData);
  const [netIncome, setNetIncome] = useState([{ frequency: '', amount: 0 }]);

  const [data, setData] = useState({
    apiReq: {
      demographics: {
        zip: 14001,
        age: 25,
        household_members: 1,
        is_homeowner: false,
        net_annual_income: 10000,
      },
      budget: {
        savings: null,
        other_debt_payments: 10,
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
      ...transformerData,
    },
  };
  const budgetPayload = {
    budget: { ...data.apiReq.budget },
    demographics: { ...data.apiReq.demographics },
    transformer: {
      ...transformerData,
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

      case 'alcoholic_beverages' || 'food_home':
        setData((data) => ({
          apiReq: {
            ...data.apiReq,
            budget: {
              ...data.apiReq.budget,
              alcoholic_beverages: Math.round(+value / 2),
              food_home: Math.round(+value / 2),
            },
          },
        }));
        break;
      case 'toys_and_hobbies' || 'fees_and_admissions':
        setData((data) => ({
          apiReq: {
            ...data.apiReq,
            budget: {
              ...data.apiReq.budget,
              toys_and_hobbies: Math.round(+value / 2),
              fees_and_admissions: Math.round(+value / 2),
            },
          },
        }));
        break;

      case 'home_maintenance_and_repairs' ||
        'housekeeping_supplies' ||
        'other_household_expenses':
        setData((data) => ({
          apiReq: {
            ...data.apiReq,
            budget: {
              ...data.apiReq.budget,
              home_maintenance_and_repairs: Math.round(+value / 3),
              housekeeping_supplies: Math.round(+value / 3),
              other_household_expenses: Math.round(+value / 3),
            },
          },
        }));
        break;

      case 'water_and_public_services' ||
        'natural_gas' ||
        'heating_fuels_other':
        setData((data) => ({
          apiReq: {
            ...data.apiReq,
            budget: {
              ...data.apiReq.budget,
              water_and_public_services: Math.round(+value / 3),
              natural_gas: Math.round(+value / 3),
              heating_fuels_other: Math.round(+value / 3),
            },
          },
        }));
        break;

      case 'medical_services' || 'medical_supplies' || 'prescription_drugs':
        setData((data) => ({
          apiReq: {
            ...data.apiReq,
            budget: {
              ...data.apiReq.budget,
              medical_services: Math.round(+value / 3),
              medical_supplies: Math.round(+value / 3),
              prescription_drugs: Math.round(+value / 3),
            },
          },
        }));
        break;

      case 'other_debt_payments':
      case 'mortgage_and_rent':
      case 'vehicle_purchase_and_lease':
      case 'health_insurance':

      case 'cash_contributions':
      case 'clothing_items_and_services':
      case 'education':
      case 'electricity':
      case 'food_out':
      case 'furniture_and_appliances':
      case 'gasoline':
      case 'life_and_personal_insurance':
      case 'media_hardware_and_services':
      case 'miscellaneous':
      case 'other_lodging':
      case 'personal_care':
      case 'personal_services':
      case 'pets':
      case 'public_and_other_transportation':
      case 'reading':
      case 'telephone_services':
      case 'tobacco_and_smoking':
      case 'vehicle_insurance':
      case 'vehicle_maintenance_and_repairs':
        // case 'savings'  :

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
    let value =
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

      case 'other_debt_payments':
      case 'mortgage_and_rent':
      case 'vehicle_purchase_and_lease':
      case 'health_insurance':
        // case 'savings'  :

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
        strutureTransformData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
