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
  filterNeeds,
  filterWants,
  modalBudgetSum,
  filterFinancialSavings,
} from '../../../../../../utlis/Helper';
import useFormContext from '../../../../../../hooks/useFormContext';

const BugetModal = ({ id }) => {
  const { categoryInputHandler } = useFormContext();
  const { demographics } = useSelector((state) => state.demographics);
  const { budgets } = useSelector((state) => state.budget);
  const { lendings } = useSelector((state) => state.lending);
  const [savingsSet, setSavingsSet] = useState(false);

  const [ModalData, setModalData] = useState([]);
  const [peeersData, setPeersData] = useState([]);
  const [yourData, setYourData] = useState([]);

  const init = () => {
    setModalData([
      { category: 'Needs', value: 50 },
      { category: 'Wants', value: 30 },
      { category: 'Finanical Goals', value: 20 },
    ]);
    const demoghrapic = getStructureObject(demographics);
    const peersNeedData = filterNeeds(demoghrapic);
    const peerWantData = filterWants(demoghrapic);
    const peerFinanicalGoalData = filterFinancialSavings(demoghrapic);
    const peerNeeds = modalBudgetSum(peersNeedData);
    const peersWants = modalBudgetSum(peerWantData);
    const peerFinanicalGoal = modalBudgetSum(peerFinanicalGoalData);

    setPeersData([
      { category: 'Needs', value: peerNeeds },
      { category: 'Wants', value: peersWants },
      { category: 'Finanical Goals', value: peerFinanicalGoal },
    ]);
    const budget = getStructureObject(budgets);
    const yourNeedData = filterNeeds(budget);
    const yourWantData = filterWants(budget);
    const yourFinanicalGoalData = filterFinancialSavings(budget);
    const yourNeeds = modalBudgetSum(yourNeedData);
    const yourWants = modalBudgetSum(yourWantData);
    const yourFinanicalGoal = modalBudgetSum(yourFinanicalGoalData);

    setYourData([
      { category: 'Needs', value: yourNeeds },
      { category: 'Wants', value: yourWants },
      { category: 'Finanical Goals', value: yourFinanicalGoal },
    ]);
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (lendings && lendings.elements && !savingsSet) {
      const savings = Math.round(lendings.elements.cash_excess / 12);
      categoryInputHandler('savings', savings);
      setSavingsSet(true);
    }
  }, [lendings, categoryInputHandler, savingsSet]);
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
          {ModalData && (
            <BudgetChart data={ModalData} id={id ? id.chart1 : 'chartdiv1'} />
          )}
        </div>
        <div>
          <div className={classes.chart_header_label}>Your Peers</div>
          {peeersData && (
            <BudgetChart data={peeersData} id={id ? id.chart2 : 'chartdiv2'} />
          )}
        </div>
        <div>
          <div className={classes.chart_header_label}>You</div>
          {yourData && (
            <BudgetChart data={yourData} id={id ? id.chart3 : 'chartdiv3'} />
          )}
        </div>
      </div>
    </>
  );
};

export default BugetModal;
