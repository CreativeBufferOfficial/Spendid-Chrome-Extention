// import { apiUrls } from './ApiUrl';
// import { defaultConfig } from './config';

// export const redirectProfile = (id) => {
//   const API_ROOT = defaultConfig.baseAPIUrl;
//   const url = API_ROOT + apiUrls.profile + id;
//   const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
//   if (newWindow) newWindow.opener = null;
// };
// export const redirectSetting = () => {
//   const API_ROOT = defaultConfig.baseAPIUrl;
//   const url = API_ROOT + apiUrls.setting;
//   const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
//   if (newWindow) newWindow.opener = null;
// };

// export const ticketDetailsHandler = (ticket_id) => {
//   const API_ROOT = defaultConfig.baseAPIUrl;
//   const url = API_ROOT + apiUrls.ticketDetails + ticket_id;
//   const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
//   if (newWindow) newWindow.opener = null;
// };

// const getYear = (date) => {
//   return date.getFullYear();
// };
// const formatmonth = (date) => {
//   let month = date.getMonth() + 1;
//   return month < 10 ? '0' + month : '' + month;
// };
// const formatDay = (date) => {
//   let day = date.getDate();
//   return day < 10 ? '0' + day : '' + day;
// };

// export const todayDate = () => {
//   const today = new Date();
//   return getYear(today) + '-' + formatmonth(today) + '-' + formatDay(today);
// };

// export const fromDateMonth = () => {
//   const newDate = new Date();
//   const StartDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
//   // const lastDate = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
//   const year = getYear(StartDate);
//   const month = formatmonth(StartDate);
//   const firstDay = formatDay(StartDate);

//   const firstDate = `${year}-${month}-${firstDay}`;

//   console.log(`inside fromDatamonth ${firstDate}`);
//   return firstDate;
// };

// export const toDateMonth = () => {
//   const newDate = new Date();
//   const lastDate = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
//   const year = getYear(lastDate);
//   const month = formatmonth(lastDate);
//   const lastDay = formatDay(lastDate);
//   const endDate = `${year}-${month}-${lastDay}`;
//   console.log(`inside toDateMonth ${endDate}`);

//   return endDate;
// };
