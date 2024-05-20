import { Component, OnInit, inject } from '@angular/core'
import { heroMagnifyingGlass, heroMoon } from '@ng-icons/heroicons/outline'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { ItemCardComponent } from '../../components/item-card/item-card.component'
import { CountriesService } from '../../services/countries.service'
import { Country } from '../../interfaces'

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [NgIconComponent, ItemCardComponent],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css',
  providers: [provideIcons({ heroMoon, heroMagnifyingGlass })]
})
export class CountryListComponent implements OnInit {
  countriesService: CountriesService = inject(CountriesService)
  countries!: Country[]

  ngOnInit (): void {
    this.countriesService.getAllCountries()
      .subscribe(
        {
          next: (v) => { this.countries = v; console.log(v) },
          error: (e) => console.error(e)
        }
      )
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async getWithFetchApi () {
    await this.countriesService.getCountries()
      .then((res: Country[]) => {
        this.countries = res
      })
  }
}
