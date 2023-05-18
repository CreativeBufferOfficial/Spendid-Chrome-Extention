import ResultChartAm4 from "./ResultChartAm4"

const Result = () => <ResultChartAm4 />
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
        { label: 'Your Result', content: <Result /> },
        { label: 'Your Opportunities', content: <TabB /> },
        { label: 'Your Budget Modal', content: <TabC /> },
    ]










