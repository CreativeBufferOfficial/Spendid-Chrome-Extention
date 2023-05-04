import React from 'react';

const Progress_bar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    width: '360px',
    backgroundColor: 'whitesmoke',
    borderRadius: 40,
    marginRight: 15,
    marginLeft: 15,
  };

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: 'center',
    transitionDuration: '1s',
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span></span>
      </div>
    </div>
  );
};

export default Progress_bar;
