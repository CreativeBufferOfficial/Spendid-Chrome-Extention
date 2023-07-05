import React, { useState } from 'react';
import classes from './Tab.module.css';
import useFormContext from '../../../../hooks/useFormContext';

const ResultPageInput = ({ tabs }) => {
  const { setActiveTabNumber } = useFormContext();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setActiveTabNumber(index);
  };

  return (
    <>
      <div>
        <div className={classes.tab_bar}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`${classes.tab} ${
                index === activeTab ? classes.active : classes.non_active
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className={classes.tab_content}>{tabs[activeTab].content}</div>
      </div>
    </>
  );
};

export default ResultPageInput;
