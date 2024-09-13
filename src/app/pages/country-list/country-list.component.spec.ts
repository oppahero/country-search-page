import { RouterTestingModule } from '@angular/router/testing'
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

describe('CountryListComponent', () => {
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
        FilterByComponent,
        RouterTestingModule
      ],
      providers: [
        { provide: CountriesService, useValue: countriesServiceSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(CountryListComponent)
    component = fixture.componentInstance

    countriesServiceSpy = TestBed.inject(CountriesService)
    countriesServiceSpy.getAllCountries.and.returnValue(of(mockedData.data))

    fixture.detectChanges()

    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('#consult should call getAllCountries', (done: DoneFn) => {
    countriesServiceSpy.getAllCountries().subscribe({
      next: () => {
        expect(component.filterCountries).toBeDefined()
        expect(component.countries).toBeDefined()
        done()
      }
    })
  })

  it('#filterByCountry branch 1- filter by searchInput text', () => {
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

  it('#filterByCountry branch 2- searchInput text empty, filter by region', () => {
    const spy = spyOn(component, 'filterByRegion')

    component.region = 'Asia'
    component.filterByCountry('')

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('Asia')
  })

  it('#filterByRegion Branch1 - filter by region selected', () => {
    component.countries = mockedData.data

    const region = 'Asia'

    component.filterByRegion(region)
    expect(component.region).toBe(region)
    expect(component.filterCountries.length).toBeGreaterThan(0)

    const oneElement = component.filterCountries[0]

    expect(oneElement.region).toBe(region)
  })

  it('#filterByRegion Branch2 - no filter selected, show all', () => {
    component.countries = mockedData.data

    const region = ''

    component.filterByRegion(region)
    expect(component.filterCountries).toEqual(component.countries)
  })
})
