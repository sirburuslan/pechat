/*
 * @provider Settings
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-04-09
 *
 * This provider is used to provide the settings for website
 */

// System Utils
import { APP_INITIALIZER } from '@angular/core';

// App Utils
import { SettingsService } from '../../services/settings.service';

// Get the settings's data
export const initSettingsFactory = (settingsService: SettingsService) => {
  return () => settingsService.getSettings();
}

// Export the provider
export const initSettingsProvider = () => {
  return {
    provide: APP_INITIALIZER,
    useFactory: initSettingsFactory,
    deps: [SettingsService],
    multi: true,
  };
};
