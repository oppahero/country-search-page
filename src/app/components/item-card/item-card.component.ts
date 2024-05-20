import { Component, Input } from '@angular/core'
import { Country } from '../../interfaces'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() country!: Country
}
