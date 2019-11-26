import { InjectionToken, Injector } from '@angular/core';

/**
 * This class enables manual service injection
 */
// tslint:disable-next-line: no-unnecessary-class
export class LocatorService {
    public static injector: Injector;

    public static get<T>(token: string): T {
        return LocatorService.injector.get(new InjectionToken<T>(token));
    }
}
