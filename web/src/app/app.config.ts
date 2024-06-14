// System Utils
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

// Installed Utils
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';

// App Utils
import { routes } from './app.routes';
import { initSettingsProvider } from './core/providers/settings.provider';
import { initUserProvider } from './core/providers/user.provider';
import { AuthRoutingModule } from './pages/auth/auth-routing.module';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { HttpErrorCustomService } from './services/http-error-custom.service';
import { AdminRoutingModule } from './pages/dashboard/admin/admin-routing.module';
import { NotificationsDirective } from './shared/directives/notifications.directive';

// Load the Languages Files
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

// Provide the Translation with default language
export const provideTranslation = () => ({
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

// Export the Application Configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      HttpClientModule,
      TranslateModule.forRoot(provideTranslation()),
      MarkdownModule.forRoot(),
      AuthRoutingModule,
      AdminRoutingModule,
    ]),
    provideRouter(routes),
    initSettingsProvider(),
    initUserProvider(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorCustomService,
      multi: true,
    },
    NotificationsDirective,
  ],
};
