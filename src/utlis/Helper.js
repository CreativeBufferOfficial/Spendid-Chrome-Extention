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
  return data.filter(
    (obj) =>
      obj.category === 'Rent or Mortgage Payment' ||
      obj.category === 'Health Insurance' ||
      obj.category === 'Car Payments' ||
      obj.category === 'Other Debt Payments & Obligations'
  );
};

export const filterMonthlyBillExpenses = (data) => {
  return data.filter(
    (obj) =>
      obj.category === 'Charitable Giving' ||
      obj.category === 'Utilities - Power Bill' ||
      obj.category === 'Car Insurance' ||
      obj.category === 'Utilities - Other' ||
      obj.category === 'Cable / Internet / Streaming' ||
      obj.category === 'Phone Services'
  );
};

export const filterOtherExpenses = (data) => {
  return data.filter(
    (obj) =>
      obj.category === 'Groceries' ||
      obj.category === 'Dining Out' ||
      obj.category === 'Gasoline & EV-Charging' ||
      obj.category === 'Fun & Leisure' ||
      obj.category === 'Clothing & Jewelry' ||
      obj.category === 'Medical Spending' ||
      obj.category === 'Home Maintenance & Services' ||
      obj.category === 'Medical Spending' ||
      obj.category === 'Miscellaneous' ||
      obj.category === 'Education' ||
      obj.category === 'Vacation & Other Lodging' ||
      obj.category === 'Car Maintenance' ||
      obj.category === 'Personal Care Products and Services' ||
      obj.category === 'Pets' ||
      obj.category === 'Transportation Fares' ||
      obj.category === 'Life & Other Personal Insurance' ||
      obj.category === 'Babysitting / Preschool / Eldercare'
  );
};

export const filterSavings = (data) => {
  return data.filter((obj) => obj.category === 'Amount to Savings Each Period');
};

export const filterCategory = (data) => {
  return data.filter(
    (obj) =>
      obj.category === 'Groceries' ||
      obj.category === 'Charitable Giving' ||
      obj.category === 'Clothing & Jewelry' ||
      obj.category === 'Education' ||
      obj.category === 'Utilities - Power Bill' ||
      obj.category === 'Fun & Leisure' ||
      obj.category === 'Dining Out' ||
      obj.category === 'Home Appliances & Furniture' ||
      obj.category === 'Gasoline & EV-Charging' ||
      obj.category === 'Health Insurance' ||
      obj.category === 'Utilities - Other' ||
      obj.category === 'Home Maintenance & Services' ||
      obj.category === 'Life & Other Personal Insurance' ||
      obj.category === 'Cable / Internet / Streaming' ||
      obj.category === 'Medical Spending' ||
      obj.category === 'Miscellaneous' ||
      obj.category === 'Rent or Mortgage Payment' ||
      obj.category === 'Other Debt Payments & Obligations' ||
      obj.category === 'Vacation & Other Lodging' ||
      obj.category === 'Personal Care Products and Services' ||
      obj.category === 'Babysitting / Preschool / Eldercare' ||
      obj.category === 'Pets' ||
      obj.category === 'Transportation Fares' ||
      obj.category === 'Amount to Savings Each Period' ||
      obj.category === 'Phone Services' ||
      obj.category === 'Car Insurance' ||
      obj.category === 'Car Maintenance' ||
      obj.category === 'Car Payments'
  );
};

export const getTabData = (array1, array2) => {
  // Dynamically add a key-value pair to each object in the array
  for (let i = 0; i < array1.length; i++) {
    let key = 'Amount';
    let value = array2[i].value;
    array1[i][key] = value;
  }
};

export const sortdecending = (a, b) => b.value - a.value;
export const sortAscending = (a, b) => a.value - b.value;

export const sortdecendingAmount = (a, b) => b.Amount - a.Amount;
export const sortAscendingAmount = (a, b) => a.Amount - b.Amount;

export const getDiffrenceToPeers = (array) => {
  const filteredData = array
    .filter((obj) => obj.Amount - obj.value > 0)
    .map((obj) => ({ ...obj, difference: obj.Amount - obj.value }));

  return filteredData;
};

export const filterNeeds = (data) => {
  return data.filter(
    (obj) =>
      obj.category === 'Rent or Mortgage Payment' ||
      obj.category === 'Health Insurance' ||
      obj.category === 'Car Payments' ||
      obj.category === 'Other Debt Payments & Obligations' ||
      obj.category === 'Charitable Giving' ||
      obj.category === 'Utilities - Power Bill' ||
      obj.category === 'Car Insurance' ||
      obj.category === 'Utilities - Other' ||
      obj.category === 'Cable / Internet / Streaming' ||
      obj.category === 'Phone Services'
  );
};

export const modalValue = (data) => {
  const sum = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );
  return sum;
};

export const getStructureTransform = (obj) => {
  const result = [];
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result.push(...getStructureObject(obj[key])); // Recursively call the function for nested objects
    } else {
      result.push({ payloadName: key, name: obj[key] }); // Convert the key-value pair into an object and push it to the result array
    }
  }
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
  }

  return copiedObj;
};
