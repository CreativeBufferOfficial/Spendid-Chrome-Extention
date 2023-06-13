export const printLine = (line) => {
  console.log('===> FROM THE PRINT MODULE:', line);
};
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === 'popup') {
//     const popup = document.createElement('div');
//     popup.style.position = 'fixed';
//     popup.style.top = '0';
//     popup.style.left = '0';
//     popup.style.width = '200px';
//     popup.style.height = '100px';
//     popup.style.background = 'white';
//     popup.style.zIndex = '9999';
//     popup.innerHTML = 'This is a popup!';

//     const targetElement = document.getElementById('app-container'); // Replace this with your desired target element

//     targetElement.addEventListener('mouseover', () => {
//       document.body.appendChild(popup);
//     });

//     targetElement.addEventListener('mouseout', () => {
//       document.body.removeChild(popup);
//     });
//   }
// });
