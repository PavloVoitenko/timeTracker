import { CardOptions } from './tr-card-options';

/**
 * Row of card options
 */
export class CardLayoutRow {
    public cardOptions: CardOptions[] = [];
}

/**
 * Card layout
 */
export class CardLayout {
    public layoutRows: CardLayoutRow[] = [];
}