// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    projectId: 'powerbuypin',
    appId: '1:271306468951:web:e3da914228559a0386fd12',
    storageBucket: 'powerbuypin.appspot.com',
    apiKey: 'AIzaSyBphq2PbxcI2izdW7I-7oYoKtUSGNOtBls',
    authDomain: 'powerbuypin.firebaseapp.com',
    messagingSenderId: '271306468951',
    measurementId: 'G-6T0L1NLVS1',
  },
  // baseBackendURL: 'http://localhost:9000'
  baseBackendURL: 'https://powerbuypin.herokuapp.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
