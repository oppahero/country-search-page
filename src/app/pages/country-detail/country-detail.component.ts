/* eslint-disable @typescript-eslint/prefer-readonly */
import { CountriesService } from '../../services/countries.service'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { heroArrowLeft } from '@ng-icons/heroicons/outline'
import { Component, OnInit, inject } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { Country } from '../../interfaces'

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css',
  providers: [provideIcons({ heroArrowLeft })]
})
export class CountryDetailComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute)
  countriesService = inject(CountriesService)
  location = inject(Location)

  country: Country | undefined
  borderCountries!: string[]

  ngOnInit (): void {
    const param: string = this.activatedRoute.snapshot.params['country']
    const countryName = param.replace(/-/g, ' ')
    this.consult(countryName)
  }

  consult (countryName: string): void {
    this.countriesService.getAllCountries().subscribe({
      next: (countries) => {
        this.findCountry(countries, countryName)
        this.getBorderCountries(countries)
      }
    })
  }

  findCountry (countries: Country[], countryName: string): void {
    this.country = countries.find((country) => country.name.toLowerCase() === countryName)
  }

  back (): void {
    this.location.back()
  }

  languages (): string {
    const languages = this.country?.languages?.map((obj) => obj.name)
    return languages?.join(', ') ?? ''
  }

  currencies (): string {
    const currencies = this.country?.currencies?.map((obj) => obj.name)
    return currencies?.join(', ') ?? ''
  }

  topLevelDomain (): string {
    return this.country?.topLevelDomain?.join(',') ?? ''
  }

  getBorderCountries (allCountries: Country[]): void {
    const borders = this.country?.borders ?? []
    this.borderCountries = allCountries
      .filter((obj) => borders.includes(obj.alpha3Code))
      ?.map((obj) => obj.name)
  }
}
