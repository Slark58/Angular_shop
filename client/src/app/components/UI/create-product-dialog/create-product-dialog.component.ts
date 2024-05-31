import { Component, OnInit, inject, signal } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.scss']
})
export class CreateProductDialogComponent  {
  // public data: { dialogText: string} = inject(MAT_DIALOG_DATA)
  // public dialogText: string = this.data.dialogText 
  maxImgs: number = 3
  imgs = signal<{
    src: string | ArrayBuffer | null | undefined,
    name: string
  }[]>([])

  constructor(
    public dialogRef: MatDialogRef<CreateProductDialogComponent>,
    private _fb: FormBuilder
  ) {}


  // public get imgs(): FormArray {
  //   return this.productForm.get('imgs') as FormArray
  // }

  // public productFbForm = this._fb.group({
  //   name: ['', [Validators.required]],
  //   price: [0],
  //   oldPrice: [0],
  //   imgs: this._fb.array([])
  // })


  public productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    oldPrice: new FormControl(null, [Validators.required]),
    imgs: new FormControl<File[]>([], [Validators.required]),
  })


  public changeImgs(e: Event) {
    this.imgs.set([])
    this.productForm.value.imgs = []
    

    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files) {
      const files = Array.from(inputElement.files) // Или использовать file объекты напрямую
      
      if (files.length > this.maxImgs) {
        alert(`You can only add up to ${this.maxImgs} files.`);
        this.productForm.patchValue({imgs: []})
        return;
      }

      this.productForm.value.imgs = [...files]

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

  public NewImg(): FormGroup {

    // return this._fb.group({
    //   picture: '',
    // })

    return new FormGroup({
      picture: new FormControl([], [Validators.required]),
    })  
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
