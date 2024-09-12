import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CountryDetailComponent } from './country-detail.component'
import { CommonModule, Location } from '@angular/common'
import { NgIconComponent } from '@ng-icons/core'
import { ActivatedRoute } from '@angular/router'
import { CountriesService } from '../../services/countries.service'

import mockedData from '../../../../db.json'
import { of } from 'rxjs'

describe('CountryDetailComponent', () => {
  let component: CountryDetailComponent
  let fixture: ComponentFixture<CountryDetailComponent>

  const mockLocation = { back: jasmine.createSpy('back') }

  let countriesServiceSpy = jasmine.createSpyObj('CountriesService', [
    'getAllCountries'
  ])

  const expectedCountry = mockedData.data[4]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgIconComponent, CommonModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { country: 'american-samoa' } }
          }
        },
        { provide: CountriesService, useValue: countriesServiceSpy },
        { provide: Location, useValue: mockLocation }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(CountryDetailComponent)
    component = fixture.componentInstance

    countriesServiceSpy = TestBed.inject(CountriesService)

    countriesServiceSpy.getAllCountries.and.returnValue(of(mockedData))

    fixture.detectChanges()

    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // it('#consult should call getAllCountries', () => {
  // TODO: falta desarrollar test

  //   expect(countriesServiceSpy.getAllCountries).toHaveBeenCalled()
  //   expect(component.findCountry).toHaveBeenCalledWith(mockedData.data, 'american samoa')
  //   expect(component.getBorderCountries).toHaveBeenCalledWith(mockedData.data)

  //   // countriesServiceSpy.getAllCountries().subscribe({
  //   //   next: (res: any) => {
  //   //     expect(res).toBeDefined()

  //   //     // component.findCountry(countries, 'american-samoa')
  //   //     // expect(component.findCountry).toHaveBeenCalled()
  //   //     done()
  //   //   },
  //   //   error: (err: any) => {
  //   //     expect(err).toBeDefined()
  //   //   }
  //   // })
  // })

  it('#findCountry find the expect country ', () => {
    component.findCountry(mockedData.data, 'american samoa')
    expect(component.country).toBe(expectedCountry)
  })

  it('#languages should return the speak languages in the country, separated by commas', () => {
    component.country = expectedCountry
    const languages = component.languages()
    expect(languages).toBe('English, Samoan')
  })

  it('#currencies should return the currencies in the country, separated by commas', () => {
    component.country = expectedCountry
    const currencies = component.currencies()
    expect(currencies).toBe('United States Dollar')
  })

  it('#currencies should return the country topLevelDomain, separated by commas', () => {
    component.country = expectedCountry
    const topLevelDomain = component.topLevelDomain()
    expect(topLevelDomain).toBe('.as')
  })

  it('#getBorderCountries Branh 1 - 2 : should find the names of the border countries from the country received', () => {
    component.country = mockedData.data[0]
    component.getBorderCountries(mockedData.data)

    expect(component.borderCountries).toEqual([
      'China', 'Iran (Islamic Republic of)', 'Pakistan', 'Tajikistan',
      'Turkmenistan', 'Uzbekistan'
    ])

    // Branch 2
    component.country = undefined
    component.getBorderCountries(mockedData.data)
    expect(component.borderCountries).toEqual([])
  })

  it('#back should create', () => {
    component.back()
    expect(mockLocation.back).toHaveBeenCalled()
  })
})
