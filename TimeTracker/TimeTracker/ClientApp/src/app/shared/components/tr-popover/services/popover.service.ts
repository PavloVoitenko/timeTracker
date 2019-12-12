import { ComponentType, ConnectionPositionPair, Overlay, VerticalConnectionPos } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { ElementRef, Injectable, InjectionToken, Injector, TemplateRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { ILooseObject } from '../../../util/loose-object';
import { PopoverComponent } from '../tr-popover.component';
import { PopoverConfig } from '../util/popover-config';
import { PopoverRef } from '../util/popover-ref';

import { ConnectionPosBuilder, HorizontalDirection, VerticalDirection } from './connection-pos-builder';

export const POPOVER_DATA = new InjectionToken('popover.data');
const TWO = 2;

/**
 * This class provides means of interaction with popovers
 */
@Injectable({
  providedIn: 'root',
})
export class PopoverService {
  public constructor(private readonly overlay: Overlay, private readonly injector: Injector) {}

  public open<D = ILooseObject>(
    // tslint:disable-next-line: no-any
    componentOrTemplate: ComponentType<any> | TemplateRef<any>,
    target: ElementRef | HTMLElement,
    config: Partial<PopoverConfig> = {},
  ): PopoverRef<D> {
    const popoverConfig = { ...PopoverConfig.Default, ...config };

    const arrowSize = popoverConfig.arrowSize;
    const arrowOffset = popoverConfig.arrowOffset !== undefined ? popoverConfig.arrowOffset : 0;
    const panelOffset = arrowSize !== undefined ? arrowSize / TWO : 0;

    const preferredPositions = this.getPositionStrategies(arrowOffset, panelOffset);
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(target)
      .withPush(false)
      .withFlexibleDimensions(false)
      .withPositions(preferredPositions);

    const overlayRef = this.overlay.create({
      backdropClass: config.backdropClass,
      hasBackdrop: true,
      panelClass: config.panelClass,
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    // tslint:disable-next-line: no-any
    const popoverRef = new PopoverRef<any>(overlayRef, positionStrategy, popoverConfig);

    const popover = overlayRef.attach(
      new ComponentPortal(PopoverComponent, undefined, new PortalInjector(this.injector, new WeakMap([[PopoverRef, popoverRef]]))),
    ).instance;

    if (componentOrTemplate instanceof TemplateRef) {
      popover.attachTemplatePortal(
        new TemplatePortal(componentOrTemplate, (undefined as unknown) as ViewContainerRef, {
          $implicit: config.data,
          popover: popoverRef,
        }),
      );
    } else {
      popover.attachComponentPortal(
        new ComponentPortal(
          componentOrTemplate,
          undefined,
          new PortalInjector(
            this.injector,
            new WeakMap<ILooseObject>([
              [POPOVER_DATA, config.data],
              [PopoverRef, popoverRef],
            ]),
          ),
        ),
      );
    }

    return popoverRef;
  }

  private getPositionStrategies(arrowOffset: number, panelOffset: number): ConnectionPositionPair[] {
    const result: ConnectionPositionPair[] = [];
    const strategyBuilder = new ConnectionPosBuilder(arrowOffset, panelOffset);
    const verticalPositions: VerticalConnectionPos[] = Object.values(VerticalDirection);
    const horizontalPositions: HorizontalDirection[] = Object.values(HorizontalDirection);

    verticalPositions.forEach(v => {
      horizontalPositions.forEach(h => result.push(strategyBuilder.build(v, h)));
    });

    return result;
  }
}
