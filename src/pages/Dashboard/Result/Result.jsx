// import React from 'react';
// import Header from '../../../component/UI/MainHeader/Header';
// import ResultTitle from '../../../component/UI/Result/ResultTitle';
// import classes from './Result.module.css';
// import GaugeChart from './ResultsPage/ResultChart/GaugeChartAm4/GaugeChart';
// import { useSelector } from 'react-redux';
// import Loader from '../../../component/Loader/Loader';
// const Result = () => {
//   const { loadingScore, scores } = useSelector((state) => state.score);

//   return (
//     <>
//       {loadingScore ? (
//         <Loader />
//       ) : (
//         <>
//           <Header />
//           <div className={classes.content}>
//             <div className={classes.headtitle}>
//               <div className={classes.designBox}></div>
//               <p>Your result</p>
//             </div>
//             <ResultTitle title="SPENDiD Budget Health Score" />
//             <GaugeChart scores={scores && scores} />
//             <ResultTitle title="Monthly Predicted Saving Ability" />
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Result;
