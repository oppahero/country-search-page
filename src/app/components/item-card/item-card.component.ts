import { Component, Input } from '@angular/core'
import { Country } from '../../interfaces'

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() country!: Country
}
