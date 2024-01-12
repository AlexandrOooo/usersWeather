import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HOME_PAGE_URL } from '../../constants/index.constants';

@Component({
  selector: 'app-go-to-button',
  standalone: true,
  imports: [],
  templateUrl: './go-to-button.component.html',
  styleUrl: './go-to-button.component.scss',
})
export class GoToButtonComponent {
  @Input() text: string = 'Go to Home';
  @Input() goToAddress: string = HOME_PAGE_URL;

  constructor(private router: Router) {}

  goTo() {
    this.router.navigate([this.goToAddress]);
  }
}
