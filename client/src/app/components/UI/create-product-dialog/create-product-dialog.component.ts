import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.scss']
})
export class CreateProductDialogComponent  {

  public data: { dialogText: string} = inject(MAT_DIALOG_DATA)
  public dialogText: string = this.data.dialogText

  constructor(public dialogRef: MatDialogRef<CreateProductDialogComponent>) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

}
