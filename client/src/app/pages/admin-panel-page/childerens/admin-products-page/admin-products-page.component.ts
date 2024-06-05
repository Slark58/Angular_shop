import { Component, DoCheck, OnChanges, OnInit, inject, signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateProductDialogComponent } from '../../../../components/UI/create-product-dialog/create-product-dialog.component';
import { AdminService } from '../../../../services/admin.service';
import { ProductCharForm, ProductCreateForm } from '../../../../models/Form';
import { ProductsService } from '../../../../services/products.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FiltersService } from '../../../../services/filters.service';

interface IImgSig {
  imgView: {
    src: string | ArrayBuffer | null | undefined,
    name: string
  }[]
  imgFormValue: File[] 
}


@Component({
  selector: 'app-admin-products-page',
  templateUrl: './admin-products-page.component.html',
  styleUrls: ['./admin-products-page.component.scss']
})
export class AdminProductsPageComponent {

  public adminService: ProductsService = inject(ProductsService)
  public filtersService: FiltersService = inject(FiltersService)
  
  maxImgs: number = 3
  imgs = signal<IImgSig>({} as IImgSig)

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.filtersService.getAllFilters()
  }

  public get chars(): FormArray {
    return this.productFbForm.get('chars') as FormArray
  }

  public productFbForm = this.formBuilder.group({
    name: [<string>'', [Validators.required]],
    price: [<number | null> null, [Validators.required]],
    oldPrice: [<number | null>null, [Validators.required]],
    colorId: [<number | null>null, [Validators.required]],
    chars: this.formBuilder.array<ProductCharForm>([]),
  }) 

  private newChar() {
    return this.formBuilder.group({
      color: [<number | null> null, [Validators.required]], 
      size: [<number | null> null, [Validators.required]], 
      type: [<number | null> null, [Validators.required]],
      gender: [<number | null> null, [Validators.required]],
      count: [<number | null>null, [Validators.required]]
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
    this.imgs.set({
      imgFormValue: [],
      imgView: []
    })
    

    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files) {
      const files = Array.from(inputElement.files) 

      console.log(files);
      console.log(inputElement.value);
      
      
      if (files.length > this.maxImgs) {
        alert(`You can only add up to ${this.maxImgs} files.`);
        this.imgs.set({
          imgFormValue: [],
          imgView: []
        })
        return;
      }


      files.forEach(file => {
        
        const reader = new FileReader()

        reader.onload = ev => {
          const src = ev.target?.result
          this.imgs.update((prev) => ({
            ...prev,
            imgView: [...prev.imgView, {name: file.name, src: src}],
            imgFormValue: [...files],
          }))
        }
        
        reader.readAsDataURL(file)
      })

      console.log(this.imgs());
      

    }
  }


  public onSubmit() {
        const {chars, name, oldPrice, colorId, price } = this.productFbForm.value
        
        console.log(chars);
        
        if (chars && name && oldPrice && price && colorId) {

          const formData = new FormData()
          formData.append('name', name)
          formData.append('price', price.toString())
          formData.append('oldPrice', oldPrice.toString())
          formData.append('colorId', colorId.toString())
          this.imgs().imgFormValue.forEach((file, i) => {
            formData.append('imgs', file)
          })
          formData.append('chars', JSON.stringify(chars))

          this.adminService.createProduct(formData)
        }
  }

  // onNoClick(): void {
  //   this.dialogRef.close('close using func');
  // }
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(CreateProductDialogComponent);

  //   dialogRef.afterClosed()
  //     .subscribe((result: ProductCreateForm) => {
        
        // const formData = new FormData()
        // formData.append('name', result.name)
        // formData.append('price', result.price.toString())
        // formData.append('oldPrice', result.oldPrice.toString())
        // result.imgs.forEach((file, i) => {
        //   formData.append('imgs', file)
        // })
        // formData.append('color', result.chars.color.toString())
        // formData.append('size', result.chars.size.toString())
        // formData.append('type', result.chars.type.toString())
        // formData.append('gender', result.chars.gender.toString())

        // this.adminService.createProduct(formData)
  //       console.log(result);
  //     });
  // }

}



