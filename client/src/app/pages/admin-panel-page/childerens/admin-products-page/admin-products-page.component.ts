import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductDialogComponent } from '../../../../components/UI/create-product-dialog/create-product-dialog.component';

@Component({
  selector: 'app-admin-products-page',
  templateUrl: './admin-products-page.component.html',
  styleUrls: ['./admin-products-page.component.scss']
})
export class AdminProductsPageComponent  {


  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProductDialogComponent);

    dialogRef.afterClosed()
      .subscribe(result => {
        // const imgs = result.imgs.map((item: string) => item[0])
        // console.log(imgs);
        console.log(result.imgs);
      });
  }



}
