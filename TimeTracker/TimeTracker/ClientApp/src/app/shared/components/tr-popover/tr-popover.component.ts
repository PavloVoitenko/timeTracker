import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, ComponentRef, EmbeddedViewRef, ViewChild } from '@angular/core';

/**
 * Popover component
 */
@Component({
  selector: 'tr-popover',
  styleUrls: ['./tr-popover.component.styl'],
  templateUrl: './tr-popover.component.html',
})
export class PopoverComponent extends BasePortalOutlet {
  @ViewChild(CdkPortalOutlet, { static: true }) public portalOutlet: CdkPortalOutlet;

  public attachComponentPortal<T>(componentPortal: ComponentPortal<any>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(componentPortal);
  }

  public attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    return this.portalOutlet.attachTemplatePortal(portal);
  }
}
