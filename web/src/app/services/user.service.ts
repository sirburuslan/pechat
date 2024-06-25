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
  catchError,
} from 'rxjs';

// App Utils
import { environment } from '../../environment';
import type ApiResponse from '../shared/models/api-response.model';
import type { CreateUser, UpdateUser, User, UserPassword } from '../shared/models/user.model';
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
    private httpClient: HttpClient,
    private tokensService: TokensService,
    private sidebarStatusService: SidebarStatusService,
  ) {}

  // Accessors

  get check(): Observable<boolean> {
    if (this.isAuthenticated) return of(true);

    if (!this.tokensService.getToken) return of(false);

    return this.getUser();
  }

  // Other Methods

  register(credentials: {
    email: string;
    password: string;
  }): Observable<{ success: boolean; message: string }> {
    return this.httpClient.post<{ success: boolean; message: string }>(
      environment.apiUrl + `api/v1.0/auth/registration`,
      {
        email: credentials.email,
        password: credentials.password,
      },
    );
  }

  createUser(user: CreateUser): Observable<ApiResponse<null>> {
    // Try to save the user
    return this.httpClient.post<ApiResponse<null>>(
      environment.apiUrl + `api/v1.0/admin/users/create`,
      user,
    );
  }

  updateUser(user: UpdateUser, id: number): Observable<ApiResponse<null>> {
    // Try to save the user
    return this.httpClient.put<ApiResponse<null>>(
      environment.apiUrl + `api/v1.0/admin/users/${id}/update`,
      user,
    );
  }

  updateUserPassword(user: UserPassword, id: number): Observable<ApiResponse<null>> {
    // Try to update the user's password
    return this.httpClient.put<ApiResponse<null>>(
      environment.apiUrl + `api/v1.0/admin/users/${id}/update-password`,
      user,
    );
  }

  getUser(): Observable<boolean> {
    return this.httpClient
      .post(environment.apiUrl + `api/v1.0/member/settings`, {})
      .pipe(
        switchMap((response: unknown) => {
          const res = response as ApiResponse<User>;
          this.currentUserSubject.next(res.content);
          this.sidebarStatusService.changeSidebarStatus(
            res.content ? res.content.sidebar : false,
          );
          this.isAuthenticated = true;
          return of(true);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error.message);
          return of(false);
        }),
      );
  }

  getUserById(id: number) {
    // Get the user's data
    return this.httpClient.get<ApiResponse<User>>(
      environment.apiUrl + `api/v1.0/admin/users/${id}/info`,
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
        environment.apiUrl + `api/v1.0/auth/signin`,
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
