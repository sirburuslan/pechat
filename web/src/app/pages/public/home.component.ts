// System Utils
import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Installed Utils
import { TranslateService } from '@ngx-translate/core';

// App Utils
import { environment } from '../../../environment';
import { SettingsService } from '../../services/settings.service';
import { TopBarComponent } from './parts/top-bar/top-bar.component';
import { PresentationComponent } from './parts/presentation/presentation.component';
import { StatsComponent } from './parts/stats/stats.component';
import { FeaturesComponent } from './parts/features/features.component';
import { PlansComponent } from './parts/plans/plans.component';
import { FaqComponent } from './parts/faq/faq.component';
import { FooterComponent } from './parts/footer/footer.component';

// Configurtion
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopBarComponent,
    PresentationComponent,
    StatsComponent,
    FeaturesComponent,
    PlansComponent,
    FaqComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: '../../../assets/styles/public/_main.scss',
  encapsulation: ViewEncapsulation.None,
})

// Logic
export class HomeComponent {
  siteName = '';

  // Inject services
  constructor(
    private titleService: Title,
    private translateService: TranslateService,
    private settingsService: SettingsService
  ) {

    this.settingsService.currentSettings.subscribe(settings => {
      console.log(settings?.siteName);
      this.siteName = (typeof settings?.siteName !== 'undefined')?settings?.siteName:environment.siteName;
    });

    this.translateService.get('site_slogan').subscribe((pageTitle: string) => {
      this.titleService.setTitle(this.siteName + ' | ' + pageTitle);
    });

  }

  // Detect when the id is changed and scroll the page
  handleIdFromChild(id: string) {
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      // Scroll the page
      if (id === '#features') {
        const featuresEl = document.querySelector(
          '.pc-features',
        ) as HTMLElement | null;
        if (featuresEl) {
          const featuresTopPosition = featuresEl.offsetTop;
          window.scrollTo({ top: featuresTopPosition, behavior: 'smooth' });
        }
      } else if (id === '#pricing') {
        const plansEl = document.querySelector(
          '.pc-plans',
        ) as HTMLElement | null;
        if (plansEl) {
          const plansTopPosition = plansEl.offsetTop;
          window.scrollTo({ top: plansTopPosition, behavior: 'smooth' });
        }
      } else if (id === '#faq') {
        const faqEl = document.querySelector('.pc-faq') as HTMLElement | null;
        if (faqEl) {
          const faqTopPosition = faqEl.offsetTop;
          window.scrollTo({ top: faqTopPosition, behavior: 'smooth' });
        }
      }
    }
  }
}
