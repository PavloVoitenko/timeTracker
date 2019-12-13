import { Injectable } from '@angular/core';
import * as moment from 'moment';

/**
 * This class handles application initialization
 */
@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  public initializeApp(): void {
    moment.locale('en', {
      week: {
        dow: 1,
        doy: 0,
      },
    });
    moment.locale('en');
  }
}
