// System Utils
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// Installed Utils
import { TranslateModule } from '@ngx-translate/core';

// App Utils
import { environment } from '../../../../../environment';


// Configuration
@Component({
  selector: 'app-top-bar-min',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './top-bar-min.component.html'
})

// Logic
export class TopBarMinComponent {
  // Site name and url
  siteName = environment.siteName;
  siteUrl = environment.siteUrl;
}
