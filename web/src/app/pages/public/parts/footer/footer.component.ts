// System Utils
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Installed Utils
import { TranslateModule } from '@ngx-translate/core';

// App Utils
import { environment } from '../../../../../environment';

// Configuration
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './footer.component.html',
})

// Logic
export class FooterComponent {
  siteName = environment.siteName;
}
