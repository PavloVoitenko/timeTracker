import { ILooseObject } from './loose-object';

export interface IIdentityEntity {
    getIdentity(): string;
}

/**
 * Entity which uses Id as identity
 */
export class IdIdentity implements IIdentityEntity {
    public id: number;

    public getIdentity(): string {
        return 'id';
    }
}

/**
 * Loose object with identity
 */
export class LooseIdentity implements ILooseObject, IIdentityEntity {
    // tslint:disable-next-line: no-any
    [key: string]: any;

    private identityColumn: string;

    private constructor() { }

    public static create(identity: string): LooseIdentity {
        const li: LooseIdentity = new LooseIdentity();
        li.identityColumn = identity;

        return li;
    }

    public getIdentity(): string {
        return this.identityColumn;
    }
}
