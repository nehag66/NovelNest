import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-card-layout',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './card-layout.component.html',
  styleUrl: './card-layout.component.scss'
})
export class CardLayoutComponent {
  @Input() cardTitle: string = 'sample card title';
  @Input() cardNumber: number = 1;
  @Input() imgSrc: string = 'img';
}
