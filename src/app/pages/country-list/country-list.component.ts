import { Component } from '@angular/core'
import { heroMagnifyingGlass, heroMoon } from '@ng-icons/heroicons/outline'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { ItemCardComponent } from '../../components/item-card/item-card.component'

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [NgIconComponent, ItemCardComponent],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css',
  providers: [provideIcons({ heroMoon, heroMagnifyingGlass })]
})
export class CountryListComponent {

}
