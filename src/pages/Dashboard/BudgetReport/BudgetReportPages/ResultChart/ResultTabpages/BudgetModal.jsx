import React, { useEffect } from 'react';
import classes from './ResultChartAm4.module.css';
import {
  questionIcon,
  markGreenIcon,
  markRedIcon,
  markPurpleIcon,
  BudgetChart,
} from '../../../../../../utlis/Imports';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getStructureObject,
  filterOtherExpenses,
  filterNeeds,
  modalValue,
} from '../../../../../../utlis/Helper';
import useFormContext from '../../../../../../hooks/useFormContext';

const BugetModal = ({ id }) => {
  const { data, setData, categoryInputHandler, chartSvg, setChartSvg } =
    useFormContext();
  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);

  const [ModalData, setModalData] = useState([]);
  const [peeersData, setPeersData] = useState([]);
  const [yourData, setYourData] = useState([]);

  // const [chart1,setChart1] =useState("")
  // const [chart2,setChart2] =useState("")
  // const [chart3,setChart3] =useState("")

  const init = () => {
    setModalData([
      { category: 'Needs', value: 50 },
      { category: 'Wants', value: 30 },
      { category: 'Finanical Goals', value: 20 },
    ]);
    const totalBuget = data.apiReq.demographics.net_annual_income;
    const demoghrapic = getStructureObject(demographics);
    const peersNeedData = filterNeeds(demoghrapic);
    const peerWantData = filterOtherExpenses(demoghrapic);
    const peerNeeds = modalValue(peersNeedData);
    const peersWants = modalValue(peerWantData);
    const peersFinanical_Goals = totalBuget - (peerNeeds + peersWants);
    // console.log('peersNeedData', peersNeedData, 'peerWantData', peerWantData);
    // console.log(
    //   'peerNeeds',
    //   peerNeeds,
    //   'peersWants',
    //   peersWants,
    //   'peersFinanical_Goals',
    //   peersFinanical_Goals
    // );

    setPeersData([
      { category: 'Needs', value: peerNeeds },
      { category: 'Wants', value: peersWants },
      { category: 'Finanical Goals', value: peersFinanical_Goals },
    ]);
    const budget = getStructureObject(budgets);
    const yourNeedData = filterNeeds(budget);
    const yourWantData = filterOtherExpenses(budget);

    const yourNeeds = modalValue(yourNeedData);
    const yourWants = modalValue(yourWantData);
    const yourFinanical_Goals = totalBuget - (yourNeeds + yourWants);
    // console.log('yourNeedData', yourNeedData, 'yourWantData', yourWantData);

    // console.log(
    //   'yourNeeds',
    //   yourNeeds,
    //   'yourWants',
    //   yourWants,
    //   'yourFinanical_Goals',
    //   yourFinanical_Goals
    // );

    setYourData([
      { category: 'Needs', value: yourNeeds },
      { category: 'Wants', value: yourWants },
      { category: 'Finanical Goals', value: yourFinanical_Goals },
    ]);

    categoryInputHandler('savings', yourFinanical_Goals);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className={classes.content}>
        <div className={classes.headtitle}>
          <div className={classes.designBox}></div>
          <p>Your Budget Model (50-30-20)</p>
          <img src={questionIcon} alt="icon" />
        </div>
        <div className={classes.chart_labels}>
          <div className={classes.chart_label}>
            <img src={markGreenIcon} alt="NeedIcon" />
            <p>Needs</p>
          </div>
          <div className={classes.chart_label}>
            <img src={markPurpleIcon} alt="WantIcon" />
            <p>Wants</p>
          </div>
          <div className={classes.chart_label}>
            <img src={markRedIcon} alt="RedIcon" />
            <p>Financial Goals</p>
          </div>
        </div>

        <div>
          <div className={classes.chart_header_label}>50-30-20 Model</div>
          <BudgetChart
            data={ModalData}
            id={id ? id.chart1 : 'chartdiv1'}
            // setChartSvg={setChartSvg}
            // chartSvg={chartSvg}
            // svg={svg}
          />
        </div>
        <div>
          <div className={classes.chart_header_label}>Your Peers</div>
          <BudgetChart
            data={peeersData}
            id={id ? id.chart2 : 'chartdiv2'}
            // setChartSvg={setChartSvg}
            // chartSvg={chartSvg}
            // svg={svg}
          />
        </div>
        <div>
          <div className={classes.chart_header_label}>You</div>
          <BudgetChart
            data={yourData}
            id={id ? id.chart3 : 'chartdiv3'}
            // setChartSvg={setChartSvg}
            // chartSvg={chartSvg}
            // svg={svg}
          />
        </div>
      </div>
    </>
  );
};

export default BugetModal;
