// System Utils
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// App Utils
import { ModalService } from '../../services/modal.service';
import { IconComponent } from '../../shared/general/icon/icon.component';

// Configuration
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './modal.component.html',
  styleUrl: '../../../assets/styles/admin/_main.scss',
  encapsulation: ViewEncapsulation.None,
})

// Logic
export class ModalComponent implements AfterViewInit {
  @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;
  modalStatus: string = '';
  modalSize: string = 'pc-modal-md';

  constructor(
    private modalService: ModalService,
    private elementRef: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    if (typeof this.modalService.options !== 'undefined') {
      this.modalSize = this.modalService.options.size;
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }

  handleKeydown(): void {
    this.modalService.closeModal();
  }

  openModal() {
    this.modalStatus = 'pc-modal-show';
  }

  removeModal() {
    this.modalStatus = 'pc-modal-hide';

    setTimeout(() => {
      this.modalService.options = undefined;
      this.elementRef.nativeElement.remove();
      this.modalService.newModalComponent?.destroy();
    }, 200);
  }
}
