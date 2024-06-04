import { Component, DoCheck, OnChanges, OnInit, inject, signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateProductDialogComponent } from '../../../../components/UI/create-product-dialog/create-product-dialog.component';
import { AdminService } from '../../../../services/admin.service';
import { ProductCreateForm } from '../../../../models/Form';
import { ProductsService } from '../../../../services/products.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FiltersService } from '../../../../services/filters.service';

@Component({
  selector: 'app-admin-products-page',
  templateUrl: './admin-products-page.component.html',
  styleUrls: ['./admin-products-page.component.scss']
})
export class AdminProductsPageComponent implements DoCheck {

  public adminService: ProductsService = inject(ProductsService)
  

  maxImgs: number = 3
  imgs = signal<{src: string | ArrayBuffer | null | undefined, name: string}[]>([])

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  filtersService: FiltersService = inject(FiltersService)


  ngDoCheck(): void {
    console.log(this.productFbForm.value);
  }

  ngOnInit(): void {
    this.filtersService.getAllFilters()
  }

  public get chars(): FormArray {
    return this.productFbForm.get('chars') as FormArray
  }

  public productFbForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: [null, [Validators.required]],
    oldPrice: [null, [Validators.required]],
    imgs: [<File[]>[], [Validators.required]],
    // imgs: []
    chars: this.formBuilder.array([])
  })

  private newChar() {
    return this.formBuilder.group({
      color: [ null, [Validators.required]], 
      size: [ null, [Validators.required]], 
      type: [ null, [Validators.required]],
      gender: [ null, [Validators.required]],
      count: [null, [Validators.required]]
    })
  }

  public addNewChar(e: Event) {
    e.preventDefault()
    this.chars.push(this.newChar())
  }

  public removeChar(i: number) {
    this.chars.removeAt(i)
  }



  public triggerInputImgs(ref: HTMLInputElement) {
    ref.click()
  }

  public changeImgs(e: Event) {
    this.imgs.set([])
    this.productFbForm.value.imgs = []
    

    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files) {
      const files = Array.from(inputElement.files) 

      console.log(files);
      console.log(inputElement.value);
      
      
      if (files.length > this.maxImgs) {
        alert(`You can only add up to ${this.maxImgs} files.`);
        this.productFbForm.patchValue({imgs: []})
        return;
      }

      this.productFbForm.value.imgs = [...files]

      files.forEach(file => {
        
        const reader = new FileReader()

        reader.onload = ev => {
          const src = ev.target?.result
          this.imgs.update((prev) => [...prev, {name: file.name, src: src}])
        }
        
        reader.readAsDataURL(file)
      })

      

    }
  }



  // onNoClick(): void {
  //   this.dialogRef.close('close using func');
  // }






  // openDialog(): void {
  //   const dialogRef = this.dialog.open(CreateProductDialogComponent);

  //   dialogRef.afterClosed()
  //     .subscribe((result: ProductCreateForm) => {
        
  //       // const formData = new FormData()
  //       // formData.append('name', result.name)
  //       // formData.append('price', result.price.toString())
  //       // formData.append('oldPrice', result.oldPrice.toString())
  //       // result.imgs.forEach((file, i) => {
  //       //   formData.append('imgs', file)
  //       // })
  //       // formData.append('color', result.chars.color.toString())
  //       // formData.append('size', result.chars.size.toString())
  //       // formData.append('type', result.chars.type.toString())
  //       // formData.append('gender', result.chars.gender.toString())

  //       // this.adminService.createProduct(formData)
  //       console.log(result);
  //     });
  // }



}
