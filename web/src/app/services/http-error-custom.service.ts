/*
 * @service Http Error Custom
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-05-14
 *
 * This service is used to custom the HttpErrorResponse
 */

// System Utils
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpErrorResponse,
  HttpRequest
} from '@angular/common/http';

// Installed Utils
import { Observable, throwError, catchError } from 'rxjs';

// Configuration
@Injectable({
  providedIn: 'root'
})

// Logic
export class HttpErrorCustomService implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(catchError(this.customError))
  }
  private customError = (response: HttpErrorResponse): Observable<never> => {
    const newResponse = {
      message: response.message,
      status: response.status
    };
    return throwError(() => newResponse);
  }
}
