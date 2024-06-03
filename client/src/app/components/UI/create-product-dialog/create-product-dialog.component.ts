import { Component, OnInit, inject, signal } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FiltersService } from '../../../services/filters.service';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.scss']
})
export class CreateProductDialogComponent implements OnInit  {
  // public data: { dialogText: string} = inject(MAT_DIALOG_DATA)
  // public dialogText: string = this.data.dialogText 
  maxImgs: number = 3
  imgs = signal<{src: string | ArrayBuffer | null | undefined, name: string}[]>([])


  constructor(
    public dialogRef: MatDialogRef<CreateProductDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  filtersService: FiltersService = inject(FiltersService)



  ngOnInit(): void {
    this.filtersService.getAllFilters()
  }

  // public get imgs(): FormArray {
  //   return this.productForm.get('imgs') as FormArray
  // }

  public productFbForm = this.formBuilder.group({
    name: [<string>'', [Validators.required]],
    price: [<number | null>null, [Validators.required]],
    oldPrice: [<number | null>null, [Validators.required]],
    imgs: [<File[]>[], [Validators.required]],
    chars: this.formBuilder.group({
      colors: [<string | null> null, [Validators.required]],
      sizes: [<string | number | null> null, [Validators.required]],
      type: [<string | null> null, [Validators.required]],
      gender: [<string | null> null, [Validators.required]],
    })
  })



  public changeImgs(e: Event) {
    this.imgs.set([])
    this.productFbForm.value.imgs = []
    

    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files) {
      const files = Array.from(inputElement.files) 
      
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

      console.log(files);
      

    }
  }



  // public addNewImg(e: Event) {
  //   e.preventDefault()
  //   this.imgs.push(this.NewImg())
  // }

  // public removeImg(i: number) {
  //   this.imgs.removeAt(i)
  // }

  onNoClick(): void {
    this.dialogRef.close('close using func');
  }

}
