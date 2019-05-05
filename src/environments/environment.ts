// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth0: {
    domain: 'paarhuis.auth0.com',
    clientId: 'XKQPLJEFwXmALdchnu522L7d8AqPcQ2y',
    callbackUrl: 'http://localhost:4200'
  },
  functions: {
    // tslint:disable-next-line:max-line-length
    deleteAccount: 'https://posmn-auth0management-dev.azurewebsites.net/api/DeleteAccount?code=t7XxXJlFCxcQy0RcbogQsSsRmKjnJ0CW0Ra3QZV0YR47%2F5LECXaXww%3D%3D',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
