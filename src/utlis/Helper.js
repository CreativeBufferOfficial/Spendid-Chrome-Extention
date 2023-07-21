import {
  majorExpenseCategories,
  monthlyBillExpenseCategories,
  otherExpenseCategories,
  categories,
  needsCategories,
  wantsCategories,
  savingCategories,
} from './HelperData';

export const getStructureObject = (obj) => {
  const result = [];
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result.push(...getStructureObject(obj[key])); // Recursively call the function for nested objects
    } else {
      result.push({ category: key, value: Math.round(obj[key] / 12) }); // Convert the key-value pair into an object and push it to the result array
    }
  }
  return result;
};

export const filterMajorExpenses = (data) => {
  return data.filter((obj) => majorExpenseCategories.includes(obj.category));
};

export const filterMonthlyBillExpenses = (data) => {
  return data.filter((obj) =>
    monthlyBillExpenseCategories.includes(obj.category)
  );
};

export const filterOtherExpenses = (data) => {
  return data.filter((obj) => otherExpenseCategories.includes(obj.category));
};

export const filterSavings = (data) => {
  return data.filter((obj) => obj.category === 'Amount to Savings Each Period');
};

export const filterCategory = (data) => {
  return data.filter((obj) => categories.includes(obj.category));
};

// export const getTabData = (array1, array2) => {
//   // Dynamically add a key-value pair to each object in the array
//   for (let i = 0; i < array1.length; i++) {
//     let key = 'Amount';
//     let value = array2[i].value;
//     array1[i][key] = value;
//   }
// };

export const getTabData = (array1, array2) => {
  for (let i = 0; i < array1.length; i++) {
    array1[i].Amount = array2[i].value;
  }
};

export const sortDescending = (a, b) => b.value - a.value;
export const sortAscending = (a, b) => a.value - b.value;

export const sortDescendingAmount = (a, b) => b.Amount - a.Amount;
export const sortAscendingAmount = (a, b) => a.Amount - b.Amount;

// export const getDiffrenceToPeers = (array) => {
//   const filteredData = array
//     .filter((obj) => obj.Amount - obj.value > 0)
//     .map((obj) => ({ ...obj, difference: obj.Amount - obj.value }));

//   return filteredData;
// };

export const getDifferenceToPeers = (array) => {
  const filteredData = [];
  for (let obj of array) {
    const difference = obj.value - obj.Amount;
    if (difference > 0 || difference < 0) {
      filteredData.push({ ...obj, difference: Math.abs(difference) });
    }
  }
  const filter = filteredData.filter(
    (category) => category.category !== 'Amount to Savings Each Period'
  );

  return filter;
};
export const getDiffrenceForTable = (array) => {
  const filteredData = [];
  for (let obj of array) {
    const difference = obj.value - obj.Amount;

    if (difference || difference >= 0) {
      filteredData.push({ ...obj, difference });
    }
  }
  return filteredData;
};

export const filterNeeds = (data) => {
  return data.filter((obj) => needsCategories.includes(obj.category));
};
export const filterWants = (data) => {
  return data.filter((obj) => wantsCategories.includes(obj.category));
};
export const filterFinancialSavings = (data) => {
  return data.filter((obj) => savingCategories.includes(obj.category));
};

export const modalBudgetSum = (data) => {
  const sum = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );
  return sum;
};

// export const getStructureTransform = (obj) => {
//   const result = [];
//   for (let key in obj) {
//     if (typeof obj[key] === 'object' && obj[key] !== null) {
//       result.push(...getStructureObject(obj[key])); // Recursively call the function for nested objects
//     } else {
//       result.push({ payloadName: key, name: obj[key] }); // Convert the key-value pair into an object and push it to the result array
//     }
//   }
//   return result;
// };

export const getStructureTransform = (obj) => {
  const result = [];

  const traverseObject = (obj, prefix = '') => {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        traverseObject(obj[key], `${prefix}${key}`); // Recursively call the function for nested objects
      } else {
        result.push({ payloadName: `${prefix}${key}`, name: obj[key] }); // Convert the key-value pair into an object and push it to the result array
      }
    }
  };

  traverseObject(obj);

  return result;
};

export const copyAndMultiplyBudget = (obj) => {
  // Create a deep copy of the object
  const copiedObj = JSON.parse(JSON.stringify(obj));
  // Multiply the budget values by 12
  const budget = copiedObj.apiReq.budget;
  for (const key in budget) {
    if (typeof budget[key] === 'number') {
      budget[key] *= 12;
    }
    if (budget[key] === '' || budget[key] === ' ') {
      budget[key] = null;
    }
  }
  return copiedObj;
};

export const copyAndMultiplyDemographics = (obj) => {
  // Create a deep copy of the object
  const copiedObj = JSON.parse(JSON.stringify(obj));
  // Multiply the demographics values by 12
  const demographics = copiedObj.apiReq.demographics;
  if (typeof demographics['net_annual_income'] === 'number') {
    demographics['net_annual_income'] *= 12;
  }
  if (
    demographics['net_annual_income'] === '' ||
    demographics['net_annual_income'] === ' ' ||
    demographics['net_annual_income'] === null
  ) {
    demographics['net_annual_income'] = 60000;
  }
  if (demographics['age'] === '' || demographics['age'] === ' ') {
    demographics['age'] = 35;
  }
  if (demographics['zip'] === '' || demographics['zip'] === ' ') {
    demographics['zip'] = '35210';
  }
  return copiedObj;
};

export const calcSourceIncome = (netIncome) => {
  const calculateAmount = netIncome.map((item) => {
    switch (item.frequency) {
      case 'Weekly':
        return item.amount * 4;
      case 'Every 2 Weeks':
        return item.amount * 2;
      case 'Twice per Month':
        return item.amount * 2;
      case 'Quarterly':
        return item.amount / 3;
      case 'Semi-Annually':
        return item.amount / 6;
      case 'Annually':
        return item.amount / 12;
      default:
        return item.amount * 1;
    }
  });
  return calculateAmount;
};

export const calcTotalSourceIncome = (IncomeSource) => {
  const totalSourceIncome = IncomeSource.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return Math.round(totalSourceIncome);
};

export const getPDfGenerateDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export const formatAmountValue = (value) => {
  // Remove non-digit characters
  const numericValue = value.replace(/\D/g, '');
  // Format the number with commas
  const formattedValue = Number(numericValue).toLocaleString('en-US');
  return `$ ${formattedValue}`;
};

export const getGrade = (breakeven) => {
  let grade = '';

  if (breakeven === 0 || breakeven < 0) {
    grade = '';
  } else if (breakeven <= 59 && breakeven > 0) {
    grade = '';
  } else if (breakeven > 59 && breakeven < 70) {
    grade = '';
  } else if (breakeven >= 70 && breakeven < 80) {
    grade = '';
  } else if (breakeven >= 80 && breakeven < 85) {
    grade = 'B';
  } else if (breakeven >= 85 && breakeven < 90) {
    grade = 'B +';
  } else if (breakeven >= 90 && breakeven <= 99) {
    grade = 'A ';
  } else if (breakeven > 99) {
    grade = 'A +';
  }
  return grade;
};

export const clearLocalStorage = (fieldsToKeep) => {
  const keys = Object.keys(localStorage);
  keys.forEach(function (key) {
    if (!fieldsToKeep.includes(key)) {
      localStorage.removeItem(key);
    }
  });
};
