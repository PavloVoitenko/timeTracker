import { Component, Input } from '@angular/core';

/**
 * Card component
 */
@Component({
  selector: 'tr-card',
  styleUrls: ['./tr-card.component.styl'],
  templateUrl: './tr-card.component.html',
})
export class CardComponent {
  @Input() public title: string;
  @Input() public subtitle: string;
}
