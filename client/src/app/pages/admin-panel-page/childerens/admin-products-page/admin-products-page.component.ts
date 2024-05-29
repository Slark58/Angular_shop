import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductDialogComponent } from '../../../../components/UI/create-product-dialog/create-product-dialog.component';

@Component({
  selector: 'app-admin-products-page',
  templateUrl: './admin-products-page.component.html',
  styleUrls: ['./admin-products-page.component.scss']
})
export class AdminProductsPageComponent  {

  animal: string = 'kek'
  name: string = 'lol'

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }



}
