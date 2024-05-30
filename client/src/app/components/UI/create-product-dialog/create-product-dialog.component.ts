import { Component, OnInit, inject } from '@angular/core';
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

  constructor(
    public dialogRef: MatDialogRef<CreateProductDialogComponent>,
    private _fb: FormBuilder
  ) {}


  public get imgs(): FormArray {
    return this.productForm.get('imgs') as FormArray
  }

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
    imgs: new FormArray([
      
    ])
  })

  public NewImg(): FormGroup {

    // return this._fb.group({
    //   picture: '',
    // })

    return new FormGroup({
      picture: new FormControl('', [Validators.required]),
    })  
  }

  public addNewImg(e: Event) {
    e.preventDefault()
    this.imgs.push(this.NewImg())
  }

  public removeImg(i: number) {
    this.imgs.removeAt(i)
  }

  onNoClick(): void {
    this.dialogRef.close('close using func');
  }

}
