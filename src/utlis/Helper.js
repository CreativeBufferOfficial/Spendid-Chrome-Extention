export const getStructureObject = (obj) => {
  const result = [];
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result.push(...getStructureObject(obj[key])); // Recursively call the function for nested objects
    } else {
      result.push({ name: key, value: Math.round(obj[key] / 12) }); // Convert the key-value pair into an object and push it to the result array
    }
  }
  return result;
};

export const filterMajorExpenses = (data) => {
  return data.filter(
    (obj) =>
      obj.name === 'Rent or Mortgage Payment' ||
      obj.name === 'Health Insurance' ||
      obj.name === 'Car Payments' ||
      obj.name === 'Other Debt Payments & Obligations'
  );
};

export const filterMonthlyBillExpenses = (data) => {
  return data.filter(
    (obj) =>
      obj.name === 'Charitable Giving' ||
      obj.name === 'Utilities - Power Bill' ||
      obj.name === 'Car Insurance' ||
      obj.name === 'Utilities - Other' ||
      obj.name === 'Cable / Internet / Streaming' ||
      obj.name === 'Phone Services'
  );
};

export const filterOtherExpenses = (data) => {
  return data.filter(
    (obj) =>
      obj.name === 'Groceries' ||
      obj.name === 'Dining Out' ||
      obj.name === 'Gasoline & EV-Charging' ||
      obj.name === 'Fun & Leisure' ||
      obj.name === 'Clothing & Jewelry' ||
      obj.name === 'Medical Spending' ||
      obj.name === 'Home Maintenance & Services' ||
      obj.name === 'Medical Spending' ||
      obj.name === 'Miscellaneous' ||
      obj.name === 'Education' ||
      obj.name === 'Vacation & Other Lodging' ||
      obj.name === 'Car Maintenance' ||
      obj.name === 'Personal Care Products and Services' ||
      obj.name === 'Pets' ||
      obj.name === 'Transportation Fares' ||
      obj.name === 'Life & Other Personal Insurance' ||
      obj.name === 'Babysitting / Preschool / Eldercare'
  );
};

export const filterSavings = (data) => {
  return data.filter((obj) => obj.name === 'Amount to Savings Each Period');
};

export const getTabData = (array1, array2) => {
  // Dynamically add a key-value pair to each object in the array
  for (let i = 0; i < array1.length; i++) {
    let key = 'Amount';
    let value = array2[i].value;
    array1[i][key] = Math.round(value / 12);
  }
};

export const sortdecending = (a, b) => b.value - a.value;
export const sortAscending = (a, b) => a.value - b.value;
