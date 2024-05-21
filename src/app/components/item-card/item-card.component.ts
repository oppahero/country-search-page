import { Component, Input } from '@angular/core'
import { Country } from '../../interfaces'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() country!: Country

  getId (): string {
    return this.country.name.toLowerCase().replace(/ /g, '-')
  }
}
