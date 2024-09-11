import { RouterTestingModule } from '@angular/router/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ItemCardComponent } from './item-card.component'
import { CommonModule } from '@angular/common'
import mock from '../../../../db.json'

describe('ItemCardComponent', () => {
  let component: ItemCardComponent
  let fixture: ComponentFixture<ItemCardComponent>

  const expectedCountry = mock.data[4]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule]
    }).compileComponents()

    fixture = TestBed.createComponent(ItemCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    fixture.componentRef.setInput('country', expectedCountry)

    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should recieved a input country', () => {
    expect(component.country).toBeDefined()
    expect(component.country).toEqual(expectedCountry)
  })

  it('getId(): should return an id for the card based on the country name (name-name)', () => {
    const countryId = component.getId()
    expect(countryId).toBe('american-samoa')
  })

  it('should display country details', async () => {
    fixture.detectChanges()

    const h2: HTMLElement = fixture.nativeElement.querySelector('h2')
    expect(h2.textContent).withContext('Card Country Name').toEqual('American Samoa')

    const population: HTMLElement = fixture.nativeElement.querySelector('.card__body__info__population')
    expect(population.textContent).withContext('Card Country Population').toContain('55,197')

    const region: HTMLElement = fixture.nativeElement.querySelector('.card__body__info__region')
    expect(region.textContent).withContext('Card Country Region').toContain('Oceania')

    const capital: HTMLElement = fixture.nativeElement.querySelector('.card__body__info__capital')
    expect(capital.textContent).withContext('Card Country Capital').toContain('Pago Pago')
  })
})
