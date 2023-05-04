import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const styles = {
  dial: {
    display: 'flex',
    flexdirection: 'row',
    width: `300px`,
    height: `auto`,
    color: '#000',
    border: '0.5px solid #fff',
    padding: '20px 0px 0px 0px',
  },
  title: {
    alignItems: 'center',
    color: '#000',
  },
};

const Speedometer = ({ value }) => {
  return (
    <>
      <div style={styles.dial}>
        <ReactSpeedometer
          maxValue={100}
          minValue={0}
          height={190}
          width={290}
          value={value}
          needleTransition="easeQuadIn"
          needleTransitionDuration={1000}
          needleColor="#A7FF83"
          startColor="#E41025"
          segments={2}
          endColor="#409B92"
        />
      </div>
    </>
  );
};

export default Speedometer;
