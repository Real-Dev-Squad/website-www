// import HistoryLocation from '@ember/routing/history-location';
// import { AUTH_URL } from '../constants/urls';

// export default function redirect() {
// //   const historyLocation = HistoryLocation.create();
//   let authUrl = AUTH_URL;

// //   console.log(authUrl);
// //   if (historyLocation) {
// //     authUrl = `${authUrl}&state=${historyLocation.getURL()}`;
// //   }
// //   console.log(authUrl, "this is 2");
// //   // Since HistoryLocation doesn't have direct window.open functionality,
// //   // we can still use window for the redirect
// if(window.location){
//  console.log(window.location ? window.location.href : "not present", "this is 2");
//   window.location.href = authUrl;
// }
// }
// // export default function redirect() {
// //     if (typeof window !== 'undefined' && typeof document !== 'undefined') {
// //       const historyLocation = HistoryLocation.create();
// //       let authUrl = AUTH_URL;
  
// //       if (historyLocation) {
// //         authUrl = `${authUrl}&state=${historyLocation.getURL()}`;
// //       }
  
// //       // Use window.location.href for the redirect
// //       window.location.href = authUrl;
// //     } else {
// //       console.error('window or document is not defined');
// //     }
// //   }

import { AUTH_URL } from '../constants/url';

export default function () {
  let authUrl = AUTH_URL;
  if (typeof window !== 'undefined') {
    authUrl = `${authUrl}&state=${window.location.href}`;
  }
  console.log(authUrl, 'this is redirect auth url');
  window.open(authUrl, '_self');
}
