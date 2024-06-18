import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-top-experience',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './mobile-top-experience.component.html',
  styleUrl: './mobile-top-experience.component.css'
})
export class MobileTopExperienceComponent {

  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() description: string = '';
  @Input() image: string ='';
  @Input() place: string = '';

}
