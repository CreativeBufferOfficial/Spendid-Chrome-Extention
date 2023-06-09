import { createContext, useState } from 'react';
import {
  getStructureTransform,
  copyAndMultiplyBudget,
  copyAndMultiplyDemographics,
} from '../utlis/Helper';
import { title, transformerData } from '../utlis/HelperData';
const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const transformData = getStructureTransform(transformerData);
  const [netIncome, setNetIncome] = useState([{ frequency: '', amount: '' }]);

  const [data, setData] = useState({
    apiReq: {
      demographics: {
        zip: 14001,
        age: 25,
        household_members: 1,
        is_homeowner: false,
        net_annual_income: 0,
      },
      budget: {
        savings: null,
        other_debt_payments: 572,
        mortgage_and_rent: 952,
        vehicle_purchase_and_lease: 654,
        health_insurance: 0,
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
      // education: 0,
      // life_and_personal_insurance: 0,
      // personal_services: 0,
      // public_and_other_transportation: 0,
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

  const [globalSelectedIndex, setGlobalSelectedIndex] = useState(
    Array(10).fill(-1)
  );
  const [page, setPage] = useState(0);

  // const categoryInputHandler = (name, value) => {
  //   const keyname = name;

  //   switch (keyname) {
  //     case 'net_annual_income':
  //       setData({
  //         ...data,
  //         apiReq: {
  //           ...data.apiReq,
  //           demographics: {
  //             ...data.apiReq.demographics,
  //             [keyname]: +value,
  //           },
  //         },
  //       });

  //       break;

  //     case 'other_debt_payments':
  //       setData({
  //         ...data,
  //         apiReq: {
  //           ...data.apiReq,
  //           budget: {
  //             ...data.apiReq.budget,
  //             [keyname]: +value || null,
  //           },
  //         },
  //       });

  //       break;

  //     case 'alcoholic_beverages' || 'food_home':
  //       setData((data) => ({
  //         apiReq: {
  //           ...data.apiReq,
  //           budget: {
  //             ...data.apiReq.budget,
  //             alcoholic_beverages: Math.round(+value / 2),
  //             food_home: Math.round(+value / 2),
  //           },
  //         },
  //       }));
  //       break;
  //     case 'toys_and_hobbies' || 'fees_and_admissions':
  //       setData((data) => ({
  //         apiReq: {
  //           ...data.apiReq,
  //           budget: {
  //             ...data.apiReq.budget,
  //             toys_and_hobbies: Math.round(+value / 2),
  //             fees_and_admissions: Math.round(+value / 2),
  //           },
  //         },
  //       }));
  //       break;

  //     case 'home_maintenance_and_repairs' ||
  //       'housekeeping_supplies' ||
  //       'other_household_expenses':
  //       setData((data) => ({
  //         apiReq: {
  //           ...data.apiReq,
  //           budget: {
  //             ...data.apiReq.budget,
  //             home_maintenance_and_repairs: Math.round(+value / 3),
  //             housekeeping_supplies: Math.round(+value / 3),
  //             other_household_expenses: Math.round(+value / 3),
  //           },
  //         },
  //       }));
  //       break;

  //     case 'water_and_public_services' ||
  //       'natural_gas' ||
  //       'heating_fuels_other':
  //       setData((data) => ({
  //         apiReq: {
  //           ...data.apiReq,
  //           budget: {
  //             ...data.apiReq.budget,
  //             water_and_public_services: Math.round(+value / 3),
  //             natural_gas: Math.round(+value / 3),
  //             heating_fuels_other: Math.round(+value / 3),
  //           },
  //         },
  //       }));
  //       break;

  //     case 'medical_services' || 'medical_supplies' || 'prescription_drugs':
  //       setData((data) => ({
  //         apiReq: {
  //           ...data.apiReq,
  //           budget: {
  //             ...data.apiReq.budget,
  //             medical_services: Math.round(+value / 3),
  //             medical_supplies: Math.round(+value / 3),
  //             prescription_drugs: Math.round(+value / 3),
  //           },
  //         },
  //       }));
  //       break;

  //     // case 'other_debt_payments':
  //     case 'mortgage_and_rent':
  //     case 'vehicle_purchase_and_lease':
  //     case 'health_insurance':

  //     case 'cash_contributions':
  //     case 'clothing_items_and_services':
  //     case 'education':
  //     case 'electricity':
  //     case 'food_out':
  //     case 'furniture_and_appliances':
  //     case 'gasoline':
  //     case 'life_and_personal_insurance':
  //     case 'media_hardware_and_services':
  //     case 'miscellaneous':
  //     case 'other_lodging':
  //     case 'personal_care':
  //     case 'personal_services':
  //     case 'pets':
  //     case 'public_and_other_transportation':
  //     case 'reading':
  //     case 'telephone_services':
  //     case 'tobacco_and_smoking':
  //     case 'vehicle_insurance':
  //     case 'vehicle_maintenance_and_repairs':
  //       // case 'savings'  :

  //       setData((data) => ({
  //         apiReq: {
  //           ...data.apiReq,
  //           budget: {
  //             ...data.apiReq.budget,
  //             [name]: +value,
  //           },
  //         },
  //       }));
  //       break;

  //     default:
  //   }
  // };

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

  // const formDataHandlerChange = (e, i) => {
  //   // console.log('index', i);
  //   // console.log('globalSelectedIndex[page]', globalSelectedIndex[page]);
  //   // console.log('globalSelectedIndex', globalSelectedIndex);
  //   if (i !== -1) {
  //     globalSelectedIndex[page] = i;
  //     setGlobalSelectedIndex(globalSelectedIndex);
  //   } else {
  //     globalSelectedIndex[page] = 0;
  //     setGlobalSelectedIndex(globalSelectedIndex);
  //   }

  //   const name = e.target.getAttribute('name');
  //   let value =
  //     e.target.value === undefined
  //       ? e.target.getAttribute('value')
  //       : e.target.value;

  //   switch (name) {
  //     case 'zip':
  //     case 'age':
  //     case 'net_annual_income':
  //       setData((data) => ({
  //         apiReq: {
  //           ...data.apiReq,
  //           demographics: {
  //             ...data.apiReq.demographics,
  //             [name]: +value,
  //           },
  //         },
  //       }));

  //       break;

  //     case 'other_debt_payments':
  //     case 'mortgage_and_rent':
  //     case 'vehicle_purchase_and_lease':
  //     case 'health_insurance':
  //       // case 'savings'  :

  //       setData((data) => ({
  //         apiReq: {
  //           ...data.apiReq,
  //           budget: {
  //             ...data.apiReq.budget,
  //             [name]: +value,
  //           },
  //         },
  //       }));
  //       break;

  //     case 'household_members':
  //     case 'is_homeowner':
  //       setData((data) => ({
  //         apiReq: {
  //           ...data.apiReq,
  //           demographics: {
  //             ...data.apiReq.demographics,
  //             [name]: name === 'household_members' ? +value : JSON.parse(value),
  //           },
  //         },
  //       }));
  //       setTimeout(() => {
  //         setPage((prev) => prev + 1);
  //       }, 300);
  //       break;

  //     case 'isHealthInsured':
  //     case 'isOtherDept':
  //       if (value === 'Yes') {
  //         setTimeout(() => {
  //           setPage((prev) => prev + 1);
  //         }, 300);
  //       } else if (value === 'No') {
  //         setTimeout(() => {
  //           setPage((prev) => prev + 2);
  //         }, 300);
  //       }
  //       break;
  //     default:
  //   }
  // };

  const formDataHandlerChange = (e, i) => {
    if (i !== -1) {
      globalSelectedIndex[page] = i;
    } else {
      globalSelectedIndex[page] = 0;
    }
    setGlobalSelectedIndex(globalSelectedIndex);

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
        case 'age':
        case 'net_annual_income':
          apiReq.demographics[name] = +value;
          break;

        case 'other_debt_payments':
        case 'mortgage_and_rent':
        case 'vehicle_purchase_and_lease':
        case 'health_insurance':
          apiReq.budget[name] = +value;
          break;

        case 'household_members':
          apiReq.demographics[name] = +value;
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
        lendingPayload,
        budgetPayload,
        demographicsPayload,
        scorePayload,
        netIncome,
        setNetIncome,
        transformData,
        value,
        setValue,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
