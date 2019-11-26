import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { DefaultRoute, Path } from './path';
import { RootPath, RoutePath } from './routing-paths';

/**
 * This class builds navigation path
 */
export class NavigationBuilder<T extends DefaultRoute> {
    public constructor(private readonly currentPath: T, private readonly parentRoute: string[] = []) {}

    public to<TChild extends DefaultRoute>(navigate: (path: T) => Path<TChild>): NavigationBuilder<TChild> {
        const nextPath = navigate(this.currentPath);
        this.parentRoute.push(nextPath.route);

        if (nextPath.childPath === undefined) {
            throw Error('Attempted to access empty child');
        }

        return new NavigationBuilder(nextPath.childPath, this.parentRoute);
    }

    public toPath(navigate: (path: T) => Path): string[] {
        const nextPath = navigate(this.currentPath);
        this.parentRoute.push(nextPath.route);

        return this.parentRoute;
    }

    public toDefault(): string[] {
        return this.toPath(p => p.Default);
    }
}

/**
 * This class handles navigation on the page
 */
@Injectable({
    providedIn: 'root',
})
export class Navigator {
    private builder: NavigationBuilder<RoutePath>;

    private constructor(private readonly router: Router) {}

    public async navigate(go: (builder: NavigationBuilder<RoutePath>) => string[]): Promise<boolean> {
        this.resetBuilder();

        return this.router.navigate(this.getRouteTarget(go));
    }

    public link(go: (builder: NavigationBuilder<RoutePath>) => string[]): string {
        this.resetBuilder();

        return this.getRouteTarget(go).join('/');
    }

    private getRouteTarget(go: (builder: NavigationBuilder<RoutePath>) => string[]): string[] {
        const routeTarget = go(this.builder);

        // if (routeTarget.length > 0 && routeTarget[0] !== '/') {
        //     routeTarget[0] = `/${routeTarget[0]}`;
        // }

        return routeTarget;
    }

    private resetBuilder(): void {
        this.builder = new NavigationBuilder<RoutePath>(RootPath);
    }
}
