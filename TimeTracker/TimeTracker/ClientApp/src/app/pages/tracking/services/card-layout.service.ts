import { Injectable } from '@angular/core';

import { CardLayout, CardLayoutRow } from '../util/layout';
import { CardOptions, ViewOption } from '../util/tr-card-options';
import { TrackingSettings } from '../util/tr-settings';
import { MAX_CARDS_PER_ROW } from '../util/tr.constants';

/**
 * Card layout builder
 */
@Injectable({
    providedIn: 'root',
})
export class CardLayoutService {
    public createLayout(settings: TrackingSettings): CardLayout {
        const layoutRows: CardLayoutRow[] = [];
        const momentKey = this.viewToMoment(settings.viewOption);
        let currentRow: CardLayoutRow = new CardLayoutRow();
        let currentMoment = settings.startDate.clone().startOf(momentKey);

        do {
            if (currentRow.cardOptions.length >= MAX_CARDS_PER_ROW ||
                currentRow.cardOptions.length === 0) {

                currentRow = new CardLayoutRow();
                layoutRows.push(currentRow);
            }
            currentRow.cardOptions.push(
              new CardOptions(settings.viewOption, currentMoment.clone(), currentMoment.clone().endOf(momentKey)));
            currentMoment = currentMoment.add(1, momentKey);
        } while (currentMoment.isSameOrBefore(settings.endDate));

        return { layoutRows };
    }

    private viewToMoment(view: ViewOption): 'M' | 'w' | 'd' {
        let result: 'M' | 'w' | 'd';

        switch (view) {
          case ViewOption.Month:
            result = 'M';
            break;
          case ViewOption.Week:
            result = 'w';
            break;
          default:
            result = 'd';
        }

        return result;
      }
}
