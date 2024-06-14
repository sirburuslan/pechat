/*
 * @service TOKENS
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-05-06
 *
 * This service is used to save, read and delete the tokens
 */

// System Utils
import { Injectable } from '@angular/core';

// Installed Utils
import { CookieService } from 'ngx-cookie-service';

// Configuration
@Injectable({
  providedIn: 'root'
})

// Login
export class TokensService {
  constructor (
    private readonly cookieService: CookieService
  ) {}

  // Accessors

  get getToken(): string {
    return this.cookieService.get('jwt7');
  }

  // Other methods

  saveToken(token: string): void {
    this.cookieService.set('jwt7', token, { path: '/', expires: 14, secure: true, sameSite: 'Strict' })
  }

  deleteToken(): void {
    this.cookieService.delete('jwt7', '/');
  }

}
