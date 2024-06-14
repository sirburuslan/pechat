// System Utils
import { Component, Input } from '@angular/core';

// Configuration
@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  template: `
    <span
      class="material-icons-outlined{{ extraClass ? ' ' + extraClass : '' }}"
    >
      {{ iconName }}
    </span>
  `,
})

// Logic
export class IconComponent {
  @Input() iconName: string = '';
  @Input() extraClass: string = '';
}
