import { Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CountriesService } from '../../services/countries.service'
import { Country } from '../../interfaces'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { heroArrowLeft } from '@ng-icons/heroicons/outline'
import { Location } from '@angular/common'

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css',
  providers: [provideIcons({ heroArrowLeft })]
})
export class CountryDetailComponent implements OnInit {
  activedRouter = inject(ActivatedRoute)
  countriesService = inject(CountriesService)
  location = inject(Location)

  country: Country | undefined

  ngOnInit (): void {
    const param = this.activedRouter.snapshot.params['country']
    const countryName = param.replace(/-/g, ' ')
    this.consult(countryName)
  }

  consult (countryName: string): void {
    this.countriesService.getAllCountries().subscribe(
      {
        next: (countries) => {
          this.country = countries.find(country => country.name.toLowerCase() === countryName)
          console.log(this.country)
        },
        error: (e) => console.error(e)
      }
    )
  }

  back (): void {
    this.location.back()
  }
}
