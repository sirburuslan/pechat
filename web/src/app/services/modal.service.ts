// System Utils
import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

// App Utils
import { ModalComponent } from '../core/modal/modal.component';
import Modal from '../shared/models/modal.model';

// Configuration
@Injectable({
  providedIn: 'root',
})

// Logic
export class ModalService {
  newModalComponent!: ComponentRef<ModalComponent>;
  options: Modal | undefined;

  constructor(
    private applicationRef: ApplicationRef,
    private injector: EnvironmentInjector,
  ) {}

  // Method to open the modal
  showModal(
    newMemberTemplate: ViewContainerRef,
    modalView: TemplateRef<Element>,
    options: Modal,
  ): void {
    // Clear previous views
    newMemberTemplate.clear();

    // Update the modal options
    this.options = options;

    // Create an embedded view from the view
    const innerContent = newMemberTemplate.createEmbeddedView(modalView);

    // Change the modal content
    this.newModalComponent = newMemberTemplate.createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [innerContent.rootNodes],
    });

    // Open modal
    this.newModalComponent.instance.openModal();
  }

  // Method to close the modal
  closeModal(): void {
    // Destroy the modal
    this.newModalComponent.instance.removeModal();
  }
}
