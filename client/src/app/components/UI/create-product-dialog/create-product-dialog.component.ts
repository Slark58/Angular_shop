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
    private _fb: FormBuilder
  ) {}

  filtersService: FiltersService = inject(FiltersService)



  ngOnInit(): void {
    this.filtersService.getAllFilters()
  }

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
    name: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required]),
    oldPrice: new FormControl<number | null>(null, [Validators.required]),
    imgs: new FormControl<File[]>([], [Validators.required]),
    chars: new FormGroup({
      colors: new FormControl<number[]>([], [Validators.required]),
      sizes: new FormControl<number[]>([], [Validators.required]),
      type: new FormControl<number | null>(null, [Validators.required]),
      gender: new FormControl<number | null>(null, [Validators.required]),
    })
  })

  public isItemActive(title: string, id: number): boolean {
    if (title.toLocaleLowerCase() === 'colors') {
      const colors = this.productForm.get('chars.colors')?.value as number[] | null | undefined;
      return colors ? colors.includes(id) : false;
    } else if (title.toLocaleLowerCase() === 'sizes') {
      const sizes = this.productForm.get('chars.sizes')?.value as number[] | null | undefined;
      return sizes ? sizes.includes(id) : false;
    }
    return false;
  }

  public changeMulriSelect(title: string, id: number) {
    if (title.toLocaleLowerCase() === 'colors') {
      const colors = this.productForm.get('chars.colors')?.value as number[];
      if (colors) {
        const index = colors.indexOf(id);
        if (index !== -1) {
          colors.splice(index, 1);
          console.log(this.productForm.value);
        } else {
          colors.push(id);
          console.log(this.productForm.value);
        }
      }
    } else if (title.toLocaleLowerCase() === 'sizes') {
      const sizes = this.productForm.get('chars.sizes')?.value as number[];
      if (sizes) {
        const index = sizes.indexOf(id);
        if (index !== -1) {
          sizes.splice(index, 1);
          console.log(this.productForm.value);

        } else {
          sizes.push(id);
          console.log(this.productForm.value);

        }
      }
    }

  }
  public changeToggle(id: number) {
  
  }

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
