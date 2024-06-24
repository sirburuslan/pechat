/*
 * @service Http Interceptor
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-05-14
 *
 * This service is used to custom the HTTPClient header
 */

// System Utils
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

// Installed Utils
import { Observable } from 'rxjs';

// App Utils
import { TokensService } from './tokens.service';

// Configuration
@Injectable({
  providedIn: 'root',
})

// Logic
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private tokensService: TokensService) {}
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {

    if (this.tokensService.getToken !== '') {
      const modifiedReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Token ' + this.tokensService.getToken,
        ),
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
