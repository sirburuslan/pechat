// System Utils
import { Routes } from '@angular/router';

// App Utils
import { HomeComponent } from './pages/public/home.component';
import { TermsOfServiceComponent } from './pages/terms/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './pages/terms/privacy-policy/privacy-policy.component';

// Create the routes
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'terms/terms-of-service', component: TermsOfServiceComponent },
  { path: 'terms/privacy-policy', component: PrivacyPolicyComponent },
];
