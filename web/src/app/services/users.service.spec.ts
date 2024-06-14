// System Utils
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// App Utils
import { UsersService } from './users.service';
import { CreateUser } from '../shared/models/user.model';
import ApiResponse from '../shared/models/api-response.model';
import { of } from 'rxjs';

describe('UsersService', () => {
  let service: UsersService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UsersService);
    httpClient = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new user', (done) => {

    const mockUser: CreateUser = {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
      password: '12345678'
    };

    const mockApiResponse: ApiResponse<null> = {
      content: null,
      success: true,
      message: ''
    };

    spyOn(httpClient, 'post').and.returnValue(of(mockApiResponse));

    service.createUser(mockUser).subscribe(response => {
      expect(response).toEqual(mockApiResponse);
      done();
    });



  });

});
