import { Component } from '@angular/core'
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline'
import { NgIconComponent, provideIcons } from '@ng-icons/core'

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css',
  providers: [provideIcons({ heroMagnifyingGlass })]

})
export class SearchInputComponent {

}
