/*
 * @spec User
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-05-06
 *
 * This service is used to test the user service
 */

// System Utils
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// App Utils
import { environment } from '../../environment';
import { UserService } from './user.service';

// Test the User Service
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const registrationResponse = { success: true, message: 'Registration successful' };

    service.register({ email: 'test@test.com', password: 'password' }).subscribe((response) => {
      expect(response).toEqual(registrationResponse);
    });

    const req = httpMock.expectOne(environment.apiUrl + 'api/v1.0/auth/registration');
    expect(req.request.method).toBe('POST');
    req.flush(registrationResponse);
  });

  it ('should login a user', () => {
    const loginResponse = { success: true, message: 'Login successful' };

    service.login({ email: 'test@test.com', password: 'password' }).subscribe((response) => {
      expect(response).toEqual(loginResponse);
    })

    const req = httpMock.expectOne(environment.apiUrl + 'api/v1.0/auth/signin');
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

  });

});
