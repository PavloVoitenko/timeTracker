import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'tr-navbar',
  templateUrl: './tr-navbar.component.html',
  styleUrls: ['./tr-navbar.component.css']
})
export class TrNavbarComponent {

  constructor() {}

}
