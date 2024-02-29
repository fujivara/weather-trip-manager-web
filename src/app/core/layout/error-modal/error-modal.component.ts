import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'error-modal',
  templateUrl: 'error-modal.component.html',
  styleUrl: 'error-modal.component.css',
  standalone: true,
})
export class ErrorModalComponent {
  @Input()
    error: string = 'Something went wrong!';

  @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onModalClose = new EventEmitter<boolean>();

  onClose () {
    this.onModalClose.next(true);
  }
}
