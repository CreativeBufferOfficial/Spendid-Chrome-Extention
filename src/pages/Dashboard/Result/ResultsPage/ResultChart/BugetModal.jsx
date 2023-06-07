import React, { useEffect } from 'react';
import classes from './ResultChartAm4.module.css';
import {
  questionIcon,
  markGreenIcon,
  markRedIcon,
  markPurpleIcon,
} from '../../../../../utlis/Imports';
import BugetChart from './DonutChart/BugetChart';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getStructureObject,
  filterOtherExpenses,
  filterNeeds,
  modalValue,
} from '../../../../../utlis/Helper';
import useFormContext from '../../../../../hooks/useFormContext';
// import DonutChart from './DonutChart/DonutChart'

const BugetModal = ({ id }) => {
  const { data, setData } = useFormContext();
  const { loadingDemographics, demographics } = useSelector(
    (state) => state.demographics
  );
  const { loadingBudgets, budgets } = useSelector((state) => state.budget);
  console.log('demographics>>>>>>>', demographics);
  console.log('budgets>>>>>>>>>>', budgets);

  const [ModalData, setModalData] = useState([]);
  const [peeersData, setPeersData] = useState([]);
  const [yourData, setYourData] = useState([]);

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
    console.log('peersNeedData', peersNeedData, 'peerWantData', peerWantData);
    console.log(
      'peerNeeds',
      peerNeeds,
      'peersWants',
      peersWants,
      'peersFinanical_Goals',
      peersFinanical_Goals
    );

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
    console.log('yourNeedData', yourNeedData, 'yourWantData', yourWantData);

    console.log(
      'yourNeeds',
      yourNeeds,
      'yourWants',
      yourWants,
      'yourFinanical_Goals',
      yourFinanical_Goals
    );

    setYourData([
      { category: 'Needs', value: yourNeeds },
      { category: 'Wants', value: yourWants },
      { category: 'Finanical Goals', value: yourFinanical_Goals },
    ]);

    // setData((data) => ({
    //   apiReq: {
    //     ...data.apiReq,
    //     budget: {
    //       ...data.apiReq.budget,
    //       savings: +yourFinanical_Goals,
    //     },
    //   },
    // }));
  };

  console.log('peeersData>>>>>', peeersData);

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
            <img src={markGreenIcon} />
            <p>Needs</p>
          </div>
          <div className={classes.chart_label}>
            <img src={markPurpleIcon} />
            <p>Wants</p>
          </div>
          <div className={classes.chart_label}>
            <img src={markRedIcon} />
            <p>Financial Goals</p>
          </div>
        </div>

        <div>
          <div className={classes.chart_header_label}>50-30-20 Model</div>
          <BugetChart data={ModalData} id={id ? id.chart1 : 'chartdiv1'} />
        </div>
        <div>
          <div className={classes.chart_header_label}>Your Peers</div>
          <BugetChart data={peeersData} id={id ? id.chart2 : 'chartdiv2'} />
        </div>
        <div>
          <div className={classes.chart_header_label}>You</div>
          <BugetChart data={yourData} id={id ? id.chart3 : 'chartdiv3'} />
        </div>
      </div>
    </>
  );
};

export default BugetModal;
