import { CountriesService } from '../../services/countries.service'
import { Component, OnInit, inject } from '@angular/core'
import { Country } from '../../interfaces'
import {
  ItemCardComponent,
  FilterByComponent,
  SearchInputComponent
} from '../../components'

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [ItemCardComponent, SearchInputComponent, FilterByComponent],
  templateUrl: './country-list.component.html'
})
export class CountryListComponent implements OnInit {
  countriesService: CountriesService = inject(CountriesService)
  countries!: Country[]
  filterCountries: Country[] = []
  region: string = ''

  ngOnInit (): void {
    this.countriesService.getAllCountries().subscribe({
      next: (v) => {
        this.filterCountries = v
        this.countries = v
      }
    })
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // async getWithFetchApi () {
  //   await this.countriesService.getCountries().then((res: Country[]) => {
  //     this.countries = res
  //   })
  // }

  filterByRegion (region: string): void {
    this.region = region

    this.filterCountries =
      region !== ''
        ? this.countries.filter((country) => country.region === region)
        : this.countries
  }

  filterByCountry (name: string): void {
    if (name !== '') {
      this.filterCountries = this.filterCountries.filter((country) =>
        country.name.toLocaleLowerCase().startsWith(name.toLocaleLowerCase())
      )
    } else this.filterByRegion(this.region)
  }
}
