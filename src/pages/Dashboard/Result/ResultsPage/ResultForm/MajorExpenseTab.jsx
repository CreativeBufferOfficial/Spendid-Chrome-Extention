import React, { useState } from 'react'
import classes from "./ResultTabsFormViews.module.css"
import Expense from '../../../../../component/UI/Result/Expenses/Expense'
import { useSelector } from 'react-redux'

const MajorExpense = () => {
    const [isMajorExpensesTab, setIsMajorExpensesTab] = useState(true)
    const { loadingLendings, lendings } = useSelector(state => state.lending)
    const { loadingDemographics, demographics } = useSelector(state => state.demographics)
    const { loadingBudgets, budgets } = useSelector(state => state.budget)
    const { loadingScore, scores } = useSelector(state => state.score)
    console.log("demographics", demographics)
    function getObjectValues(obj) {
        const result = [];
        for (let key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result.push(...getObjectValues(obj[key])); // Recursively call the function for nested objects
            } else {
                result.push({ [key]: obj[key] }); // Convert the key-value pair into an object and push it to the result array
            }
        }
        return result;
    }
    const arrayOfObjects = getObjectValues(demographics);
    console.log("arrayOfObjects", arrayOfObjects)
    const MajorExpensess = arrayOfObjects.filter((obj) => obj["health_insurance"] || obj["mortgage_and_rent"] || obj["other_debt_payments"] || obj["vehicle_purchase_and_lease"])
    console.log(MajorExpensess)
    return (
        <>
            <Expense title="Rent or Mortgage Payment" amount1="1000" amount2="936" toggle_title="Fixed amount" isMajorExpensesTab={isMajorExpensesTab} />
        </>
    )
}

export default MajorExpense