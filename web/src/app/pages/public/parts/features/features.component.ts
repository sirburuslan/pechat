// System Utils
import { Component } from '@angular/core';

// Installed Utils
import { TranslateModule } from '@ngx-translate/core';

// App Utils
import { environment } from '../../../../../environment';
import { IconComponent } from '../../../../shared/general/icon/icon.component';

// Configuration
@Component({
  selector: 'app-features',
  standalone: true,
  imports: [TranslateModule, IconComponent],
  templateUrl: './features.component.html',
})

// Logic
export class FeaturesComponent {
  siteName = environment.siteName;
}
