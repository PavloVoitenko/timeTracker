import { ConnectedOverlayPositionChange, FlexibleConnectedPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ILooseObject } from '../../../util/loose-object';

import { PopoverConfig } from './popover-config';

/**
 * This class references a popover via a popover services
 */
export class PopoverRef<T = ILooseObject> {
  private readonly afterClosedOkSubject = new Subject<T>();

  public constructor(
    private readonly overlayRef: OverlayRef,
    private readonly positionStrategy: FlexibleConnectedPositionStrategy,
    public config: PopoverConfig,
  ) {
    if (!config.disableClose) {
      this.overlayRef.backdropClick().subscribe(() => {
        this.close();
      });

      this.overlayRef
        .keydownEvents()
        .pipe(filter(event => event.key === 'Escape'))
        .subscribe(() => {
          this.close();
        });
    }
  }

  public closeOk(dialogResult?: T): void {
    this.afterClosedOkSubject.next(dialogResult);
    this.afterClosedOkSubject.complete();

    this.close();
  }

  public close(): void {
    this.overlayRef.dispose();
  }

  public afterClosed(): Observable<T> {
    return this.afterClosedOkSubject.asObservable();
  }

  public positionChanges(): Observable<ConnectedOverlayPositionChange> {
    return this.positionStrategy.positionChanges;
  }
}
