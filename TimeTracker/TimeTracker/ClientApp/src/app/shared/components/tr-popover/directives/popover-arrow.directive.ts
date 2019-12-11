import { ChangeDetectorRef, Directive, HostBinding, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PopoverRef } from '../util/popover-ref';

/**
 * This directive shows popover arrow
 */
@Directive({
  selector: '[trPopoverArrow]',
})
export class PopoverArrowDirective implements OnDestroy {
  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  public arrowSize?: number;

  @HostBinding('style.top.px')
  public offsetTop: number;

  @HostBinding('style.bottom.px')
  public offsetBottom: number;

  @HostBinding('style.left.px')
  public offsetLeft: number;

  @HostBinding('style.right.px')
  public offsetRight: number;

  private readonly subscription = new Subscription();

  public constructor(private readonly popoverRef: PopoverRef, private readonly changeDetectorRef: ChangeDetectorRef) {
    this.arrowSize = popoverRef.config.arrowSize;

    this.subscription = popoverRef.positionChanges().subscribe(p => {
      const { offsetX, offsetY } = p.connectionPair;

      if (offsetX !== undefined && offsetY !== undefined) {
        this.offsetTop = offsetY >= 0 ? offsetY * -1 : 0;
        this.offsetBottom = offsetY < 0 ? offsetY : 0;
        this.offsetLeft = offsetX < 0 ? offsetX * -1 : 0;
        this.offsetRight = offsetX >= 0 ? offsetY : 0;
      }

      this.changeDetectorRef.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
