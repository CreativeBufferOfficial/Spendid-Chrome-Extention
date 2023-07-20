import { createContext, useState } from 'react';
import {
  getStructureTransform,
  copyAndMultiplyBudget,
  copyAndMultiplyDemographics,
} from '../utlis/Helper';
import { transformerData } from '../utlis/HelperData';
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

const FormContext = createContext({});
export const FormProvider = ({ children }) => {
  const transformData = getStructureTransform(transformerData);
  const [netIncome, setNetIncome] = useState([{ frequency: '', amount: '' }]);
  const [netIncomeSelectedIndex, setNetIncomeSelectedIndex] = useState([-1]);

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

  const [globalSelectedIndex, setGlobalSelectedIndex] = useState(
    Array(10).fill(-1)
  );
  const [activeTabNumber, setActiveTabNumber] = useState('');

  const [page, setPage] = useState(0);
  const [chartSvg, setChartSvg] = useState([]);
  const [scoreChart, setScoreChart] = useState('');
  const [barChart, setBarChart] = useState('');

  const [data, setData] = useState({
    apiReq: {
      demographics: {
        zip: '',
        age: '',
        household_members: 1,
        is_homeowner: false,
        net_annual_income: '',
      },
      budget: {
        savings: null,
        other_debt_payments: '',
        mortgage_and_rent: '',
        vehicle_purchase_and_lease: '',
        health_insurance: '',
      },
    },
  });
  const inputDemograpicData = copyAndMultiplyDemographics(data);
  const inputBudgetData = copyAndMultiplyBudget(data);
  const [value, setValue] = useState(
    data.apiReq.demographics.household_members
  );

  const lendingPayload = {
    budget: {
      ...inputBudgetData.apiReq.budget,
    },
    demographics: { ...inputDemograpicData.apiReq.demographics },
  };
  const demographicsPayload = {
    demographics: { ...inputDemograpicData.apiReq.demographics },
    transformer: {
      ...transformerData,
    },
  };
  const budgetPayload = {
    budget: { ...inputBudgetData.apiReq.budget },
    demographics: { ...inputDemograpicData.apiReq.demographics },
    transformer: {
      ...transformerData,
    },
  };

  const scorePayload = {
    demographics: { ...inputDemograpicData.apiReq.demographics },
    budget: { ...inputBudgetData.apiReq.budget },
  };

  const categoryInputHandler = (name, value) => {
    setData((data) => {
      const newData = { ...data };
      const { apiReq } = newData;
      // Handle specific key names
      switch (name) {
        case 'net_annual_income':
          apiReq.demographics[name] = +value;
          break;

        case 'other_debt_payments':
          if (+value > 0) {
            globalSelectedIndex[page] = 7;
          }
          apiReq.budget[name] = +value || null;
          break;

        case 'savings':
          apiReq.budget[name] = +value || null;
          break;

        case 'alcoholic_beverages':
        case 'food_home':
          apiReq.budget.alcoholic_beverages = Math.round(+value / 2);
          apiReq.budget.food_home = Math.round(+value / 2);
          break;

        case 'toys_and_hobbies':
        case 'fees_and_admissions':
          apiReq.budget.toys_and_hobbies = Math.round(+value / 2);
          apiReq.budget.fees_and_admissions = Math.round(+value / 2);
          break;

        case 'home_maintenance_and_repairs':
        case 'housekeeping_supplies':
        case 'other_household_expenses':
          apiReq.budget.home_maintenance_and_repairs = Math.round(+value / 3);
          apiReq.budget.housekeeping_supplies = Math.round(+value / 3);
          apiReq.budget.other_household_expenses = Math.round(+value / 3);
          break;

        case 'water_and_public_services':
        case 'natural_gas':
        case 'heating_fuels_other':
          apiReq.budget.water_and_public_services = Math.round(+value / 3);
          apiReq.budget.natural_gas = Math.round(+value / 3);
          apiReq.budget.heating_fuels_other = Math.round(+value / 3);
          break;

        case 'medical_services':
        case 'medical_supplies':
        case 'prescription_drugs':
          apiReq.budget.medical_services = Math.round(+value / 3);
          apiReq.budget.medical_supplies = Math.round(+value / 3);
          apiReq.budget.prescription_drugs = Math.round(+value / 3);
          break;

        // Handle other key names
        default:
          apiReq.budget[name] = +value;
          break;
      }
      return newData;
    });
  };

  const formDataHandlerChange = (e, i) => {
    if (i !== -1) {
      globalSelectedIndex[page] = i;
    } else {
      globalSelectedIndex[page] = 0;
    }

    const name = e.target.getAttribute('name');
    let value =
      e.target.value === undefined
        ? e.target.getAttribute('value')
        : e.target.value;

    setData((data) => {
      const newData = { ...data };
      const { apiReq } = newData;

      switch (name) {
        case 'zip':
          if (value.length !== 5) {
            globalSelectedIndex[page] = -1;
          }

          apiReq.demographics[name] = +value.slice(0, 5);
          localStorage.setItem([name], +value.slice(0, 5));
          break;

        case 'age':
          if (+value < 18) {
            globalSelectedIndex[page] = -1;
          }
          apiReq.demographics[name] = +value.slice(0, 2);
          localStorage.setItem([name], +value.slice(0, 2));

          break;

        case 'net_annual_income':
          apiReq.demographics[name] = +value;
          localStorage.setItem([name], +value);
          break;

        case 'other_debt_payments':
        case 'mortgage_and_rent':
        case 'vehicle_purchase_and_lease':
        case 'health_insurance':
          apiReq.budget[name] = +value || null;
          break;

        case 'household_members':
          apiReq.demographics[name] = +value;
          setTimeout(() => {
            setPage((prev) => prev + 1);
          }, 300);
          break;

        case 'is_homeowner':
          apiReq.demographics[name] = JSON.parse(value);

          setTimeout(() => {
            setPage((prev) => prev + 1);
          }, 300);
          break;

        case 'isHealthInsured':
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
          break;
      }

      setGlobalSelectedIndex(globalSelectedIndex);
      return newData;
    });
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
        formDataHandlerChange,
        prevRedirectHome,
        nextHide,
        submitHide,
        nextHandler,
        prevHandler,
        currentHandler,
        categoryInputHandler,
        globalSelectedIndex,
        setGlobalSelectedIndex,
        lendingPayload,
        budgetPayload,
        demographicsPayload,
        scorePayload,
        inputDemograpicData,
        inputBudgetData,
        netIncome,
        setNetIncome,
        transformData,
        value,
        setValue,
        activeTabNumber,
        setActiveTabNumber,
        chartSvg,
        setChartSvg,
        scoreChart,
        setScoreChart,
        barChart,
        setBarChart,

        netIncomeSelectedIndex,
        setNetIncomeSelectedIndex,
        // lendingPayload,
        // setLendingPayload,

        // demographicsPayload,
        // setDemographicsPayload,

        // budgetPayload,
        // setBudgetPayload,

        // scorePayload,
        // setScorePayload,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
