import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {

  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() description: string = '';
  @Input() image: string ='';
  @Input() place: string = '';

}
