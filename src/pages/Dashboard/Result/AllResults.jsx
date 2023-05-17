import React from 'react';
import Header from '../../../component/UI/MainHeader/Header';
import { useSelector } from 'react-redux';
import Loader from '../../../component/Loader/Loader';
import ResultPageInput from './ResultsPage/ResultPageInput';
import { inputFormTabs } from './ResultsPage/ResultForm/ResultTabsFormViews';
import { ChartTabs } from "./ResultsPage/ResultChart/ResultChart"
import Button from './Button';


const AllResult = () => {
    const { loadingScore } = useSelector((state) => state.score);
    const clearInput = () => { }

    return (
        <>
            {loadingScore ? (
                <Loader />
            ) : (
                <>
                    <Header />
                    <Button clearInput={clearInput} />
                    <ResultPageInput tabs={inputFormTabs} />
                    <ResultPageInput tabs={ChartTabs} />
                </>
            )}
        </>
    );
};

export default AllResult;
