import { Component, Input } from '@angular/core';

import { NavigationBuilder, Navigator } from '../../util/routing/navigator';
import { RoutePath } from '../../util/routing/routing-paths';

export interface IMenuItem {
  name: string;
  getTarget: (builder: NavigationBuilder<RoutePath>) => string[];
}

/**
 * Navigation bar component
 */
@Component({
  selector: 'tr-navbar',
  styleUrls: ['./tr-navbar.component.styl'],
  templateUrl: './tr-navbar.component.html',
})
export class NavbarComponent {
  public constructor(private readonly navigator: Navigator) {}

  @Input() public menuItems: IMenuItem[];

  private toLink(build: (builder: NavigationBuilder<RoutePath>) => string[]): string {
    return this.navigator.link(build);
  }

  public get menu(): Array<{ name: string; link: string }> {
    return this.menuItems.map(mi => ({ name: mi.name, link: this.navigator.link(mi.getTarget) }));
  }
}
