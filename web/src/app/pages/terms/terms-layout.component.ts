// System Utils
import { Component, ViewEncapsulation } from '@angular/core';

// App Utils
import { TopBarMinComponent } from '../public/parts/top-bar-min/top-bar-min.component';
import { FooterComponent } from '../public/parts/footer/footer.component';
import { TranslateService } from '@ngx-translate/core';

// Configuration
@Component({
  selector: 'app-terms-layout',
  standalone: true,
  imports: [
    TopBarMinComponent,
    FooterComponent,
  ],
  templateUrl: './terms-layout.component.html',
  styleUrl: '../../../assets/styles/public/_main.scss',
  encapsulation: ViewEncapsulation.None,
})

// Logic
export class TermsLayoutComponent {
  constructor(public translate: TranslateService) { }
}
