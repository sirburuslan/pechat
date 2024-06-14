// System Utils
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Installed Utils
import {
  Observable,
  BehaviorSubject,
  distinctUntilChanged,
  tap,
  of,
  switchMap,
  catchError
} from 'rxjs';

// App Utils
import { environment } from '../../environment';
import type ApiResponse from '../shared/models/api-response.model';
import type { User } from '../shared/models/user.model';
import { TokensService } from './tokens.service';
import { SidebarStatusService } from './sidebar-status.service';

// Configuration
@Injectable({
  providedIn: 'root',
})

// Logic
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated: boolean = false;

  // Inject services
  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokensService: TokensService,
    private readonly sidebarStatusService: SidebarStatusService
  ) {}

  // Accessors

  get check(): Observable<boolean> {

    if ( this.isAuthenticated )
      return of(true);

    if ( !this.tokensService.getToken )
      return of(false);

    return this.getUser();

  }

  // Other Methods
  getUser(): Observable<boolean> {
    return this.httpClient.post(environment.apiUrl + 'api/v1.0/member/settings', {})
    .pipe(
      switchMap((response: unknown) => {
        const res = response as ApiResponse<User>;
        this.currentUserSubject.next(res.content);
        this.sidebarStatusService.changeSidebarStatus(res.content?res.content.sidebar:false);
        this.isAuthenticated = true;
        return of(true);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error.message);
        return of(false);
      })
    );

  }

  register(credentials: {
    email: string;
    password: string;
  }): Observable<{ success: boolean; message: string }> {
    return this.httpClient.post<{ success: boolean; message: string }>(
      environment.apiUrl + 'api/v1.0/auth/registration',
      {
        email: credentials.email,
        password: credentials.password,
      },
    );
  }

  saveUser(user?: User) {
    if (typeof user !== 'undefined') {
      this.tokensService.saveToken(user.token);
      this.currentUserSubject.next(user);
    }
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<{ success: boolean; message: string; user?: User }> {
    return this.httpClient
      .post<{ success: boolean; message: string }>(
        environment.apiUrl + 'api/v1.0/auth/signin',
        {
          email: credentials.email,
          password: credentials.password,
        },
      )
      .pipe(tap(({ user }) => this.saveUser(user)));
  }

  logout() {
    this.isAuthenticated = false;
    this.currentUserSubject.next(null);
    this.tokensService.deleteToken();
    return of(true);
  }

}
