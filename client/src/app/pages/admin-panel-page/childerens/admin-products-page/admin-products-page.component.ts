import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductDialogComponent } from '../../../../components/UI/create-product-dialog/create-product-dialog.component';
import { AdminService } from '../../../../services/admin.service';
import { ProductCreateForm } from '../../../../models/Form';

@Component({
  selector: 'app-admin-products-page',
  templateUrl: './admin-products-page.component.html',
  styleUrls: ['./admin-products-page.component.scss']
})
export class AdminProductsPageComponent  {

  public adminService: AdminService = inject(AdminService)
  
  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProductDialogComponent);

    dialogRef.afterClosed()
      .subscribe((result: ProductCreateForm) => {
        
        const formData = new FormData()
        formData.append('name', result.name)
        formData.append('price', result.price.toString())
        formData.append('oldPrice', result.oldPrice.toString())
        result.imgs.forEach((file, i) => {
          formData.append('imgs', file)
        })

        this.adminService.createProduct(formData)
        console.log(result);
      });
  }



}
