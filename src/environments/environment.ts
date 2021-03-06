// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'uassn-dev',
    appId: '1:987504028886:web:f061f78c08046fb71e2d77',
    storageBucket: 'uassn-dev.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyDED24qvRYYQmTpK_m-Q2i-uuJ1xt30hG8',
    authDomain: 'uassn-dev.firebaseapp.com',
    messagingSenderId: '987504028886',
  },
  STORAGE_URL: 'https://firebasestorage.googleapis.com/v0/b/uassn-dev.appspot.com/o',
  production: false,
  PLATFORM_NAME: 'UASSN',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
