/**
 * Path item
 */
export class Path<TChild extends IRoute = IEmptyRoute> {
  public readonly route: string;
  public readonly childPath?: TChild;
}

export interface IRoute {
  Default: Path;
}
export interface IEmptyRoute extends IRoute {
  _: boolean;
}

/**
 * Default path
 */
export class DefaultRoute implements IRoute {
  // tslint:disable-next-line: variable-name
  public Default: Path = { route: '' };
}
