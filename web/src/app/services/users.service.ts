// System Utils
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Installed Utils
import {
  BehaviorSubject,
  Observable,
  catchError,
  distinctUntilChanged,
  take,
  tap
} from 'rxjs';

// App Utils
import type {
  CreateUser,
  User
} from '../shared/models/user.model';
import type ApiResponse from '../shared/models/api-response.model';
import List from '../shared/models/list.model';
import { environment } from '../../environment';

// Configuration
@Injectable({
  providedIn: 'root'
})

// Logic
export class UsersService {
  private userListSubject = new BehaviorSubject<List<User[]> | null>(null);
  public userList = this.userListSubject
  .asObservable()
  .pipe(distinctUntilChanged())

  constructor(
    private readonly httpClient: HttpClient
  ) {}

  // Other methods
  createUser(user: CreateUser): Observable<ApiResponse<null>> {

    // Try to save the user
    return this.httpClient.post<ApiResponse<null>>(environment.apiUrl + 'api/v1.0/admin/users/create', user);

  }

  getUsers(page: number, search: string = '') {
    search = search?encodeURIComponent(search):'';
    // Get the users list
    this.httpClient.get<List<User[]>>(environment.apiUrl + 'api/v1.0/admin/users/list?page=' + page + '&search=' + search)
    .pipe(
      tap(response => {
        this.updateUsersList(response)
      }),
      catchError(async (error) => this.handleErrors(error))
    )
    .pipe(take(1))
    .subscribe();

  }

  deleteUser(id: number) {
    // Try to delete the user
    return this.httpClient.delete<ApiResponse<null>>(environment.apiUrl +  'api/v1.0/admin/users/' + id + '/delete');
  }

  // Private methods

  private updateUsersList(response: List<User[]>) {
    this.userListSubject.next(response.items?response:null);
  }

  private handleErrors(error: unknown) {
    console.error('Error occurred:', error);
  }

}