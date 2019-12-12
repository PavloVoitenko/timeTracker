import { Injectable } from '@angular/core';

import { CardLayout, CardLayoutRow } from '../util/layout';
import { CardOptions, PeriodOption } from '../util/tr-card-options';
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
    const momentKey = this.viewToMoment(settings.viewOptions.viewOption);
    let currentRow: CardLayoutRow = new CardLayoutRow();
    let currentMoment = settings.dateOptions.startDate.clone().startOf(momentKey);

    do {
      if (currentRow.cardOptions.length >= MAX_CARDS_PER_ROW || currentRow.cardOptions.length === 0) {
        currentRow = new CardLayoutRow();
        layoutRows.push(currentRow);
      }
      currentRow.cardOptions.push(
        new CardOptions(settings.viewOptions.viewOption, currentMoment.clone(), currentMoment.clone().endOf(momentKey)),
      );
      currentMoment = currentMoment.add(1, momentKey);
    } while (currentMoment.isSameOrBefore(settings.dateOptions.endDate));

    return { layoutRows };
  }

  private viewToMoment(view: PeriodOption): 'M' | 'w' | 'd' {
    let result: 'M' | 'w' | 'd';

    switch (view) {
      case PeriodOption.Month:
        result = 'M';
        break;
      case PeriodOption.Week:
        result = 'w';
        break;
      default:
        result = 'd';
    }

    return result;
  }
}
