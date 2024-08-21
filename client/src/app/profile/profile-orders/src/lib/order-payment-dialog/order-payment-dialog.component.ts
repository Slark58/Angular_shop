import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardMaskDirective } from '../../../../../utils/directives/CardMask.directive';

@Component({
  selector: 'app-order-payment-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, CardMaskDirective],
  templateUrl: './order-payment-dialog.component.html',
  styleUrls: ['./order-payment-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPaymentDialogComponent implements OnInit {
  dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject(DIALOG_DATA);
  ngOnInit() {
  }

}
