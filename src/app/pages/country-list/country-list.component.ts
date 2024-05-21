import { SearchInputComponent, ItemCardComponent, FilterByComponent } from '../../components'
import { CountriesService } from '../../services/countries.service'
import { Component, OnInit, inject } from '@angular/core'
import { Country } from '../../interfaces'

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [ItemCardComponent, SearchInputComponent, FilterByComponent],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent implements OnInit {
  countriesService: CountriesService = inject(CountriesService)
  countries!: Country[]
  filterCountries!: Country[]

  ngOnInit (): void {
    this.countriesService.getAllCountries()
      .subscribe(
        {
          next: (v) => {
            this.filterCountries = v
            this.countries = v
          },
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

  filterByRegion (region: string): void {
    this.filterCountries = (region !== '') ? this.countries.filter(item => item.region === region) : this.countries
  }
}
