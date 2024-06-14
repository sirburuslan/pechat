// System Utils
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// App Utils
import { PageLoadingComponent } from './shared/general/page-loading/page-loading.component';

// Configuration
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    PageLoadingComponent,
  ],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
})

// Logic
export class AppComponent {}
