import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { SearchInputComponent } from './search-input.component'
import { NgIconComponent } from '@ng-icons/core'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'

fdescribe('SearchInputComponent', () => {
  let component: SearchInputComponent
  let fixture: ComponentFixture<SearchInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputComponent, NgIconComponent, FormsModule]
    }).compileComponents()

    fixture = TestBed.createComponent(SearchInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  function getInput (): { el: any } {
    const input = fixture.debugElement.query(By.css('input'))
    const el = input.nativeElement
    return { el }
  }

  it('#inputEvent', async () => {
    await fixture.whenStable().then(() => {
      const { el } = getInput()

      expect(el.value).toBe('')

      el.value = 'Belg'
      el.dispatchEvent(new Event('input'))

      expect(component.searchBy).toBe('Belg')
    })
  })

  it('#writting should call searchEvent when timeout is end ', async () => {
    await fixture.whenStable().then(fakeAsync(() => {
      const { el } = getInput()

      el.value = 'Unit'
      el.dispatchEvent(new Event('input'))
      el.value = 'Unit'
      el.dispatchEvent(new Event('input'))

      spyOn(component.searchEvent, 'emit')

      component.writting()

      tick(1000)

      expect(component.searchEvent.emit).toHaveBeenCalledTimes(1)
    }))
  })
})
