import React, { useState } from 'react'
import classes from "./ResultPageInput.module.css"

const ResultPageInput = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <>
            <div>
                <div className={classes.tab_bar}>
                    {tabs.map((tab, index) => (

                        <div
                            key={index}
                            className={`${classes.tab} ${index === activeTab ? classes.active : classes.non_active}`}
                            onClick={() => handleTabClick(index)}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
                <div className={classes.tab_content}>{tabs[activeTab].content}</div>
            </div>
        </>
    )
}

export default ResultPageInput