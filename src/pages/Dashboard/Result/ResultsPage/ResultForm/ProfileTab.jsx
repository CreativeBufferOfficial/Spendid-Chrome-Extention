import React, { useState } from 'react'
import classes from "./ResultTabsFormViews.module.css"



const ProfileTab = () => {
    const [value, setValue] = useState(1)
    const updateLabel = (event) => {
        setValue(event.target.value)
    }
    return (
        <>
            <div>
                <div className={classes.input_area} >
                    <label>
                        5-Digit Zip Code
                    </label>
                    <input type="number" className={classes.input_field} />
                </div>
                <div className={classes.input_area} >
                    <label>
                        City
                    </label>
                    <input type="text" readOnly className={classes.input_field} />
                </div>
                <div className={classes.input_area} >
                    <label>
                        State
                    </label>
                    <input type="text" readOnly className={classes.input_field} />
                </div>
                <div className={classes.input_area} >
                    <label>
                        Age
                    </label>
                    <input type="text" className={classes.input_field} />
                </div>

                <div className={classes.range_container}>
                    <label>
                        # in Household
                    </label>
                    <input
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={value}
                        onChange={updateLabel}
                    />
                    <div className={classes.range_labels}>
                        {[1, 2, 3, 4, 5].map((label) => (
                            <span
                                key={label}
                                className={`${classes.range_label} ${label === parseInt(value) ? classes.selected : ''
                                    }`}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
                <div className={classes.input_area} >
                    <label>
                        Housing Type
                    </label>
                    <div className={classes.radio_group} >
                        <div className={classes.radio_input}>
                            <input type="radio" name="Renter" value="Renter" className={classes.input_field} />
                            <label>Renter</label>
                        </div>
                        <div className={classes.radio_input}>
                            <input type="radio" name="Owner" value="Owner" className={classes.input_field} />
                            <label>Owner</label>
                        </div>
                    </div>
                </div>

                <div className={classes.input_area} >
                    <label>
                        Net Take Home Pay - Source 1
                    </label>
                    <input type="text" className={classes.input_field} />
                </div>
                <div className={classes.input_area} >
                    <label>
                        Frequency
                    </label>
                    <input type="text" className={classes.input_field} />
                </div>
                <div className={classes.net_source} >
                    <button className={classes.addSource_btn} type="button"  >+ Add Income Source </button>
                </div>
                <div className={classes.amount_text} >
                    <p>Monthly amount  to work with = $8,000</p>
                </div>

            </div>

        </>
    )
}

export default ProfileTab