import { ConnectionPositionPair, HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';

export enum HorizontalDirection {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}
export enum VerticalDirection {
  Bottom = 'bottom',
  Top = 'top',
}
export enum StartEnd {
  Start = 'start',
  End = 'end',
}

/**
 * This class builds connection position pair
 */
export class ConnectionPosBuilder {
  private readonly horizontalCenter: { overlayX: HorizontalConnectionPos; panelClass: string[] };
  private readonly horizontalLeft: { overlayX: HorizontalConnectionPos; offsetX: number; panelClass: string[] };
  private readonly horizontalRight: { overlayX: HorizontalConnectionPos; offsetX: number; panelClass: string[] };

  private readonly verticalTop: { overlayY: VerticalConnectionPos; offsetY: number; panelClass: string[] };
  private readonly verticalBottom: { overlayY: VerticalConnectionPos; offsetY: number; panelClass: string[] };

  public constructor(private readonly arrowOffset: number, private readonly panelOffset: number) {
    this.horizontalCenter = {
      overlayX: HorizontalDirection.Center,
      panelClass: [HorizontalDirection.Center],
    };
    this.horizontalLeft = {
      offsetX: -this.arrowOffset,
      overlayX: StartEnd.Start,
      panelClass: [HorizontalDirection.Left],
    };
    this.horizontalRight = {
      offsetX: this.arrowOffset,
      overlayX: StartEnd.End,
      panelClass: [HorizontalDirection.Right],
    };

    this.verticalTop = {
      offsetY: -this.panelOffset,
      overlayY: VerticalDirection.Bottom,
      panelClass: [VerticalDirection.Bottom],
    };
    this.verticalBottom = {
      offsetY: this.panelOffset,
      overlayY: VerticalDirection.Top,
      panelClass: [VerticalDirection.Top],
    };
  }

  public build(vertical: VerticalConnectionPos, horizontal: HorizontalDirection): ConnectionPositionPair {
    const verticalObj = vertical === VerticalDirection.Top ? this.verticalTop : this.verticalBottom;
    const horizontalObj =
      horizontal === HorizontalDirection.Center
        ? this.horizontalCenter
        : horizontal === HorizontalDirection.Left
        ? this.horizontalLeft
        : this.horizontalRight;

    return {
      ...verticalObj,
      ...horizontalObj,
      originX: HorizontalDirection.Center,
      originY: vertical,
      panelClass: [...verticalObj.panelClass, ...horizontalObj.panelClass],
    };
  }
}
