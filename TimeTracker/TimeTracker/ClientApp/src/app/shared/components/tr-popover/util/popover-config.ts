import { ILooseObject } from '../../../util/loose-object';

/**
 * This class represents popover configuration
 */
export class PopoverConfig<T = ILooseObject> {
    public backdropClass: string;
    public data?: T;
    public disableClose: boolean;
    public panelClass: string | string[];
    public arrowOffset?: number;
    public arrowSize?: number;

    public static get Default(): PopoverConfig {
        return {
            arrowOffset: 30,
            arrowSize: 20,
            backdropClass: '',
            disableClose: false,
            panelClass: '',
        };
    }
}
