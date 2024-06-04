import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductDialogComponent } from '../../../../components/UI/create-product-dialog/create-product-dialog.component';
import { AdminService } from '../../../../services/admin.service';
import { ProductCreateForm } from '../../../../models/Form';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-admin-products-page',
  templateUrl: './admin-products-page.component.html',
  styleUrls: ['./admin-products-page.component.scss']
})
export class AdminProductsPageComponent  {

  public adminService: ProductsService = inject(ProductsService)
  
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
        formData.append('color', result.chars.color.toString())
        formData.append('size', result.chars.size.toString())
        formData.append('type', result.chars.type.toString())
        formData.append('gender', result.chars.gender.toString())

        this.adminService.createProduct(formData)
        console.log(result);
      });
  }



}
