// System Utils
import {
  Component,
  Input
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';

// App Utils
import { UtilsService } from '../../../../../services/utils.service';

// Configuration
@Component({
  selector: 'app-field-text',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './field-text.component.html'
})

// Logic
export class FieldTextComponent {
  // Fields
  uniqueId!: string;

  // Input fields
  @Input() placeholder!: string;
  @Input() control!: FormControl;

  constructor(
    private readonly utilsService: UtilsService
  ) {
    // Generate unique id
    this.uniqueId = this.utilsService.uniqueId();
  }
}
