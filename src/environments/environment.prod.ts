import { Media } from 'src/app/shared/media.model';
import { Folder } from 'src/app/shared/folder.model';
import authConfigJson from '../../auth.config.prod.json';

export const environment = {
  production: true,
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
