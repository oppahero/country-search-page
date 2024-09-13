import { Component, OnInit } from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { heroMoon } from '@ng-icons/heroicons/outline'
import { ScriptService } from '../../services/script.service'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIconComponent],
  template: `
    <nav class="nav-bar">
      <span class="nav-bar__title">Where in the world?</span>
      <div class="nav-bar__theme" id="swithTheme">
        <ng-icon size="25" name="heroMoon"></ng-icon>
        <span>Dark Mode</span>
      </div>
    </nav>
  `,
  providers: [provideIcons({ heroMoon })]
})
export class NavComponent implements OnInit {
  constructor (private readonly scriptService: ScriptService) {}

  ngOnInit (): void {
    this.loadScript()
  }

  loadScript (): void {
    this.scriptService.loadScript({ id: 'swithTheme', url: 'assets/js/index.js' })
      .then(data => {
        console.log('script loaded ', data)
      }).catch(error => console.log(error))
  }
}
