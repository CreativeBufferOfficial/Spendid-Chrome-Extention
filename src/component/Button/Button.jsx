import React from 'react'
import classes from "./Result.module.css"

const Button = ({ clearInput }) => {
    return <button className={classes.clearInput} type="reset" onClick={clearInput} >Clear Inputs</button>
}
export default Button