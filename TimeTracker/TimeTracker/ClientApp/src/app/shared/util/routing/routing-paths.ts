// tslint:disable: completed-docs variable-name

import { DefaultRoute, Path } from './path';

export class LandingRoute extends DefaultRoute {
    public Unauthorized: Path = { route: 'unauth'};
}

export class SigningRoute extends DefaultRoute {
    public Up: Path = { route: 'up' };
    public In: Path = { route: 'in' };
}

export class ReportRoute extends DefaultRoute {
}

export class TrackingRoute extends DefaultRoute {
}

export const LandingPath = new LandingRoute();
export const SigningPath = new SigningRoute();
export const ReportPath = new ReportRoute();
export const TrackingPath = new TrackingRoute();

export class RoutePath extends DefaultRoute {
    public Landing = { route: '', childPath: LandingPath };
    public Signing = { route: 'sign', childPath: SigningPath };
    public Report = { route: 'report', childPath: ReportPath };
    public Tracking = { route: 'tracking', childPath: TrackingPath };
    public Any = { route: '**' };
}

export const RootPath = new RoutePath();
