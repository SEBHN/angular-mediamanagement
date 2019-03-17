import { Media } from 'src/app/shared/media.model';
import { Folder } from 'src/app/shared/folder.model';
import authConfigJson from '../../auth.config.json';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = { // Geile Scheiße Manu!
  production: false,
  API_URL: authConfigJson.API_URL,
  OKTA_URL: authConfigJson.OKTA_URL,
  FRONTEND_URL: authConfigJson.FRONTEND_URL,
  OKTA_CLIENT_ID: authConfigJson.OKTA_CLIENTID,

  // type guards
  isInstanceOfMedia(object: any): object is Media {
    return 'member' in object;
  },
  isInstanceOfFolder(object: any): object is Folder {
    return 'member' in object;
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
