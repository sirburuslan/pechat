// System Utils
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import {
  Title,
  SafeHtml,
  DomSanitizer
} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  RouterLink
} from '@angular/router';

// Installed Utils
import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import {
  Subscription,
  take,
  debounceTime,
  tap
} from 'rxjs';

// App Utils
import type ApiResponse from '../../../../shared/models/api-response.model';
import type { User } from '../../../../shared/models/user.model';
import { AdminDashboardLayoutComponent } from '../../../../shared/layouts/dashboard/admin-dashboard-layout.component';
import { IconComponent } from '../../../../shared/general/icon/icon.component';
import { DropdownComponent } from '../../../../shared/ui/dropdown/dropdown.component';
import { NavigationComponent } from '../../../../shared/general/navigation/navigation.component';
import { ModalService } from '../../../../services/modal.service';
import { UsersService } from '../../../../services/users.service';
import { UtilsService } from '../../../../services/utils.service';
import { NotificationsDirective } from '../../../../shared/directives/notifications.directive';

// Configuration
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    AdminDashboardLayoutComponent,
    DropdownComponent,
    IconComponent,
    NavigationComponent,
    RouterLink
  ],
  templateUrl: './users.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('iconAnimation', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({opacity: 1 })),
      state('rotating', style({ opacity: 1, animation: '2s pc-rotate-icon-animation-next infinite linear'})),
      transition('hidden => visible', [
        animate('0.5s')
      ])
    ])
  ]
})

// Logic
export class UsersComponent implements OnInit, OnDestroy {
  // Set view container for new user modal view
  @ViewChild('newUser', { static: true, read: ViewContainerRef })
  newUserModal!: ViewContainerRef;
  // Set view container for confirmation user deletion modal view
  @ViewChild('deleteUser', { static: true, read: ViewContainerRef })
  deleteUserModal!: ViewContainerRef;
  @ViewChild('deleteUser') deleteUserRef!: TemplateRef<Element>;

  // Search form controller
  searchControl: FormControl = new FormControl();

  // Users List Subscription
  usersListSubscription: Subscription;

  // Users List Container
  usersList: User[] = [];

  // Users List
  users = {
    searchClass: '',
    total: 0,
    page: 1,
  };

  // New User form
  newUserForm: FormGroup;

  // Errors messages
  errors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  // User data for dropdown content
  dropdownButton: SafeHtml = ``;

  // User Id Holder for deletion
  userId!: number;

  // Submitting status
  isSubmitting = false;

  constructor(
    private readonly title: Title,
    private readonly fb: FormBuilder,
    private readonly translateService: TranslateService,
    private readonly modalService: ModalService,
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
    private readonly notificationsDirective: NotificationsDirective,
    private readonly sanitizer: DomSanitizer,
  ) {
    // Set Page Title
    this.translateService.get('users').subscribe((pageTitle: string) => {
      this.title.setTitle(pageTitle);
    });

    // Rules
    this.newUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],
    });

    this.usersListSubscription = this.usersService.usersList.subscribe(
      (users) => {
        this.usersList = users?.items ? users.items : [];
        this.users.total = users?.items
          ? users.total
          : users?.items
            ? users.total
            : 0;
        this.users.page = users?.items
          ? users.page
          : users?.items
            ? users.page
            : 0;
        if (this.users.searchClass === 'active') {
          this.users.searchClass = 'complete';
        }
      },
    );

    // Set dropdown button content
    this.dropdownButton = this.sanitizer.bypassSecurityTrustHtml(
      `<span class="material-icons-outlined">manage_accounts</span>`,
    );
  }

  // Callbacks

  ngOnInit(): void {

    // Get the users list after component initialization
    this.usersService.getUsers(1, this.searchControl.value);

    // Detect search changes
    this.searchControl.valueChanges.pipe(
      tap(() => {
        this.users.searchClass = this.searchControl.value?'active':'';
      }),
      debounceTime(1000)
    ).subscribe(searchTerm => {

      // Prepare the search variables
      this.users.page = 1;

      // Schedule a search
      this.usersService.getUsers(this.users.page, searchTerm);

    });
  }

  ngOnDestroy(): void {
    this.usersListSubscription.unsubscribe();
  }

  // Events Handlers

  onCloseModal() {
    this.modalService.closeModal();
  }

  onCancelSearch(event: Event) {
    event.preventDefault();
    this.users.searchClass = '';
    this.users.page = 1;
    this.searchControl.setValue('');
  }

  onSubmit(event: Event) {
    event.preventDefault();

    // Enable the animation
    this.isSubmitting = true;

    // Reset error messages
    this.errors.firstName = '';
    this.errors.lastName = '';
    this.errors.email = '';
    this.errors.password = '';

    // Get the inputs data
    const firstName = this.newUserForm.get('firstName');
    const lastName = this.newUserForm.get('lastName');
    const email = this.newUserForm.get('email');
    const password = this.newUserForm.get('password');

    // Verify if the received user data is valid
    if (this.newUserForm.valid) {
      // Create a new user
      const newUserObservable = this.usersService.createUser({
        first_name: firstName?.value,
        last_name: lastName?.value,
        email: email?.value,
        password: password?.value,
      });

      // Subscribe to the newUserObservable
      newUserObservable.pipe(take(1)).subscribe({
        next: (data: ApiResponse<null>) => {
          if (data.success) {
            this.notificationsDirective.showNotification(
              'success',
              data.message,
            );
            this.newUserForm.reset();
            this.usersService.getUsers(this.users.page, this.searchControl.value);
          } else {
            this.notificationsDirective.showNotification('error', data.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      // Check if errors exists for first name
      if (firstName && firstName.errors) {
        // Set error message
        this.errors.firstName = this.translateService.instant(
          'first_name_is_short',
        );
      }

      // Check if errors exists for last name
      if (lastName && lastName.errors) {
        // Set error message
        this.errors.lastName = this.translateService.instant(
          'first_name_is_short',
        );
      }

      // Check if errors exists for email
      if (email && email.errors) {
        // Detect email format error
        this.errors.email =
          typeof email.errors['email'] !== 'undefined'
            ? this.translateService.instant('auth_email_not_valid')
            : '';

        // Detect required error
        this.errors.email =
          typeof email.errors['required'] !== 'undefined'
            ? this.translateService.instant('auth_email_short')
            : this.errors.email;
      }

      // Verify if errors exists for password
      if (password && password.errors) {
        // Detect short password
        this.errors.password =
          typeof password.errors['minlength'] !== 'undefined'
            ? this.translateService.instant('auth_password_short')
            : '';

        // Detect long password
        this.errors.password =
          typeof password.errors['maxlength'] !== 'undefined'
            ? this.translateService.instant('auth_password_long')
            : '';

        // Detect required error
        this.errors.password =
          typeof password.errors['required'] !== 'undefined'
            ? this.translateService.instant('auth_password_short')
            : this.errors.password;
      }
    }
  }

  // Other Methods

  formatDate = (dateStr: string): string => {
    return this.utilsService.formatDate(dateStr);
  };

  navigateTo(page: number) {
    this.users.page = page;
    this.usersService.getUsers(page, this.searchControl.value);
  }

  showModal(modalView: TemplateRef<Element>) {
    this.modalService.showModal(this.newUserModal, modalView, {
      size: 'pc-modal-md',
    });
  }

  exportUsers() {

    this.usersListSubscription = this.usersService.usersList.subscribe(
      (response) => {

        // Verify if the response is successfully
        if ( response && response.items && response.items.length !== 0 ) {

          // Set the list
          let list: [string[]] | null = null;

          // Append to list
          list = [[
            '"' + this.translateService.instant('user_id') + '"',
            '"' + this.translateService.instant('first_name') + '"',
            '"' + this.translateService.instant('last_name') + '"',
            '"' + this.translateService.instant('email') + '"'
          ]];

          // Total number of users
          const usersTotal: number = response.items.length;

          // List all numbers
          for ( let i = 0; i < usersTotal; i++ ) {

              // Append to list
              list.push([
                '"' + response.items[i].id + '"',
                '"' + response.items[i].first_name + '"',
                '"' + response.items[i].last_name + '"',
                '"' + response.items[i].email + '"'
              ]);

          }

          // CSV variable
          let csv: string = '';

          // Prepare the csv
          list!.forEach(function(row) {
              csv += row.join(',');
              csv += "\n";
          });

          // Create the CSV link and download the file
          const csv_link: HTMLAnchorElement = document.createElement('a');

          // Set charset
          csv_link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);

          // Open in new tab the file
          csv_link.target = '_blank';

          // Set the name of the file
          csv_link.download = 'members.csv';

          // Download the CSV
          csv_link.click();

        } else {

          // Show error
          this.notificationsDirective.showNotification(
            'error',
            this.translateService.instant('no_users_were_found')
          );

        }

      }

    );

  }

  deleteConfirmation(userId: string | number) {
    if (typeof userId === 'number') {
      this.userId = userId;
      this.modalService.showModal(this.deleteUserModal, this.deleteUserRef, {
        size: 'pc-modal-md',
      });
    } else {
      this.notificationsDirective.showNotification(
        'error',
        this.translateService.instant('user_id_not_valid'),
      );
    }
  }

  deleteUserConfirmation() {
    // Try to delete the user
    const deleteUser = this.usersService.deleteUser(this.userId);

    // Subscribe the request
    deleteUser.pipe(take(1)).subscribe({
      next: (data: ApiResponse<null>) => {
        // Check for success response
        if (data.success) {
          // Show notification
          this.notificationsDirective.showNotification('success', data.message);

          // Close the modal
          this.onCloseModal();

          // Check if is the last user in the page
          if (this.usersList.length === 1 && this.users.page > 1) {
            // Decrease the page number
            this.users.page--;
          }

          // Reload the users list
          this.usersService.getUsers(this.users.page, this.searchControl.value);
        } else {
          this.notificationsDirective.showNotification('error', data.message);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
