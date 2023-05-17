import classes from "./ResultTabsFormViews.module.css"


const TabA = () => (
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
    </div>
);

const TabB = () => (
    <div>
        <form>
            <label>
                Address:
                <input type="text" />
            </label>
            <br />
            <label>
                Phone:
                <input type="tel" />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    </div>
);
const TabC = () => (
    <div>
        <form>
            <label>
                Username:
                <input type="text" />
            </label>
            <br />
            <label>
                Password:
                <input type="password" />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    </div>
);

export const inputFormTabs =
    [
        { label: 'Profile', content: <TabA /> },
        { label: 'Major Expense', content: <TabB /> },
        { label: 'Monthly Bills', content: <TabC /> },
    ]


