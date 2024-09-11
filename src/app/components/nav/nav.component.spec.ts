import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavComponent } from './nav.component'
import { NgIconComponent } from '@ng-icons/core'
import { ScriptService } from '../../services/script.service'

describe('NavComponent', () => {
  let component: NavComponent
  let fixture: ComponentFixture<NavComponent>

  const scriptServiceSpy = jasmine.createSpyObj('ScriptService', ['loadScript'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgIconComponent],
      providers: [
        { provide: ScriptService, useValue: scriptServiceSpy }
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // it('script loaded', () => {
  //   expect(scriptServiceSpy.loadScript).toHaveBeenCalled()
  // })
})
