import { Component } from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { heroMoon } from '@ng-icons/heroicons/outline'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIconComponent],
  template: `
    <nav class="nav-bar">
      <span class="nav-bar__title">Where in the world?</span>
      <div class="nav-bar__theme">
        <ng-icon size="25" name="heroMoon"></ng-icon>
        <span>Dark Mode</span>
      </div>
    </nav>
  `,
  styleUrls: ['./nav.component.css'],
  providers: [provideIcons({ heroMoon })]
})
export class NavComponent {

}
