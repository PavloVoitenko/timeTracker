import { Directive, HostListener, Input, Optional } from '@angular/core';

import { ILooseObject } from '../../../util/loose-object';
import { PopoverRef } from '../util/popover-ref';

/**
 * Directive for button, that closes popover
 */
@Directive({
  selector: '[trPopoverClose]',
})
export class PopoverCloseDirective<T = ILooseObject> {
  @Input() public popoverResult: T;

  public constructor(@Optional() private readonly popoverRef: PopoverRef<T>) { }

  // tslint:disable-next-line: no-unsafe-any
  @HostListener('click')
  public onClick(): void {
    if (!this.popoverRef) {
      console.error('trPopoverClose is not supported within a template');

      return;
    }

    this.popoverRef.closeOk(this.popoverResult);
  }
}
