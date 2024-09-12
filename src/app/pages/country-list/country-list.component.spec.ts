import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CountryListComponent } from './country-list.component'
import { CountriesService } from '../../services/countries.service'
import mockedData from '../../../../db.json'
import { of } from 'rxjs'
import {
  FilterByComponent,
  ItemCardComponent,
  SearchInputComponent
} from '../../components'

fdescribe('CountryListComponent', () => {
  let component: CountryListComponent
  let fixture: ComponentFixture<CountryListComponent>

  let countriesServiceSpy = jasmine.createSpyObj('CountriesService', [
    'getAllCountries'
  ])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CountryListComponent,
        ItemCardComponent,
        SearchInputComponent,
        FilterByComponent
      ],
      providers: [{ provide: CountriesService, useValue: countriesServiceSpy }]
    }).compileComponents()

    fixture = TestBed.createComponent(CountryListComponent)
    component = fixture.componentInstance

    countriesServiceSpy = TestBed.inject(CountriesService)

    countriesServiceSpy.getAllCountries.and.returnValue(of(mockedData))

    fixture.detectChanges()

    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('#consult should call getAllCountries', () => {
    expect(countriesServiceSpy.getAllCountries).toHaveBeenCalled()
    expect(component.filterCountries).toBeDefined()
    expect(component.countries).toBeDefined()
  })

  it('#filterByCountry filter by searchInput text', () => {
    component.filterCountries = mockedData.data

    const expectedCountry = ['Belgium', 'Belize', 'Belarus']

    component.filterByCountry('Bel')

    expect(component.filterCountries.length).toBe(3)

    const names = component.filterCountries.reduce<string[]>((accumulator, item) => {
      accumulator.push(item.name)
      return accumulator
    }, [])

    for (let index = 0; index < expectedCountry.length; index++) {
      expect(names).toContain(expectedCountry[index])
    }
  })
})
