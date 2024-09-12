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
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // it('#consult should receive the name country to search', (done: DoneFn) => {
  // TODO: falta desarrollar test
  //   // countriesServiceSpy.getAllCountries().subscribe({
  //   //   next: (res: any) => {
  //   //     expect(res).toBeDefined()
  //   //     console.log(res.data)
  //   //     component.findCountry(res.data, 'american-samoa')
  //   //     // expect(component.findCountry).toHaveBeenCalled()
  //   //     done()
  //   //   }
  //   // })
  // })

  // it('#languages should return the speak languages in the country, separated by commas', () => {
  // TODO: falta desarrollar test

  //   // component.country = expectedCountry
  //   // const languages = component.languages()

  //   // expect(languages).toBe('English, Samoan')
  // })

  // it('#currencies should return the currencies in the country, separated by commas', () => {
  // TODO: falta desarrollar test
  // })

  // it('#currencies should return the country topLevelDomain, separated by commas', () => {
  // TODO: falta desarrollar test
  // })

  // it('#getBorderCountries ', () => {
  // TODO: falta desarrollar test
  // })

  it('#back should create', () => {
    component.back()
    expect(mockLocation.back).toHaveBeenCalled()
  })
})
