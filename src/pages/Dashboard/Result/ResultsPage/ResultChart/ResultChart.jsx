import ResultTitle from '../../../../../component/UI/Result/ResultTitle';
import classes from '../../Result.module.css'
import GaugeChart from '../../GaugeChartAm4/GaugeChart';



// export const ResultChart = () => {
// const { scores } = useSelector((state) => state.score);
const TabA = () => (
    <div>
        <div className={classes.content}>
            <div className={classes.headtitle}>
                <div className={classes.designBox}></div>
                <p>Your result</p>
            </div>
            <ResultTitle title="SPENDiD Budget Health Score" />
            <GaugeChart
            />
            <ResultTitle title="Monthly Predicted Saving Ability" />
        </div>
    </div>
);
const TabB = () => (
    <div>
        <h2>Tab B</h2>
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
        <h2>Tab C</h2>
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
export const ChartTabs =
    [
        { label: 'Tab 1', content: <TabA /> },
        { label: 'Tab 2', content: <TabB /> },
        { label: 'Tab 3', content: <TabC /> },
    ]

    // return <ChartTabs />

// }








