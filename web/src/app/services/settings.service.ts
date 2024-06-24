// System Utils
import { Injectable, makeStateKey, TransferState } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Installed Utils
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  of,
  shareReplay,
  tap,
} from 'rxjs';

// App Utils
import { environment } from '../../environment';
import type Settings from '../shared/models/settings.model';

// Configuration
@Injectable({
  providedIn: 'root',
})

// Logic
export class SettingsService {
  private currentSettingsSubject = new BehaviorSubject<Settings | null>(null);
  public currentSettings = this.currentSettingsSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
  ) {}

  getSettings(): Observable<{ website?: Settings }> {
    // Create the identifier for the settings
    const settingsKey = makeStateKey<{ website: Settings }>('settings');

    // Check if transferstate has been saven the website settings
    if (this.transferState.hasKey(settingsKey)) {
      const settingsList = this.transferState.get<{ website: Settings }>(
        settingsKey,
        { website: {} as Settings },
      );
      this.currentSettingsSubject.next(settingsList.website as Settings);
      return of(settingsList);
    }

    // Get the settings from the database
    return this.httpClient
      .get<{
        website: Settings;
      }>(environment.apiUrl + 'api/v1.0/member/settings')
      .pipe(
        tap(({ website }) => {
          this.currentSettingsSubject.next(website as Settings);
          this.transferState.set(settingsKey, { website: website });
        }),
        shareReplay(1),
      );
  }
}
