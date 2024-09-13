import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavComponent } from './nav.component'
import { NgIconComponent } from '@ng-icons/core'
import { ScriptService } from '../../services/script.service'

xdescribe('NavComponent', () => {
  let component: NavComponent
  let fixture: ComponentFixture<NavComponent>

  let scriptServiceSpy = jasmine.createSpyObj('ScriptService', ['loadScript'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgIconComponent],
      providers: [
        { provide: ScriptService, useValue: scriptServiceSpy }
      ]
    }).compileComponents()
  })

  beforeEach(async () => {
    fixture = TestBed.createComponent(NavComponent)
    component = fixture.componentInstance
    scriptServiceSpy = TestBed.inject(ScriptService)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // it('script loaded', () => {
  // TODO: falta desarrollar test
  //   expect(scriptServiceSpy.loadScript).toHaveBeenCalled()
  // })
})
