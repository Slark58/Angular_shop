import { Component, ElementRef, OnInit, inject, signal } from '@angular/core';
import {
  FormArray,
  FormArrayName,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
// import { FiltersService } from '../../../services/filters.service';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.scss'],
})
export class CreateProductDialogComponent implements OnInit {
  // public data: { dialogText: string} = inject(MAT_DIALOG_DATA)
  // public dialogText: string = this.data.dialogText
  maxImgs: number = 3;
  imgs = signal<
    { src: string | ArrayBuffer | null | undefined; name: string }[]
  >([]);

  constructor(
    public dialogRef: MatDialogRef<CreateProductDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  // filtersService: FiltersService = inject(FiltersService)

  ngOnInit(): void {
    // this.filtersService.getAllFilters()
  }

  public get chars(): FormArray {
    return this.productFbForm.get('chars') as FormArray;
  }

  public productFbForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: [null, [Validators.required]],
    oldPrice: [null, [Validators.required]],
    imgs: [<File[]>[], [Validators.required]],
    chars: this.formBuilder.array([]),
    // chars: this.formBuilder.group({ // Тут характеристики (тестовая версия)
    //   color: [ null, [Validators.required]],
    //   size: [ null, [Validators.required]],
    //   type: [ null, [Validators.required]],
    //   gender: [ null, [Validators.required]],
    //   count: [null, [Validators.required]]
    // }),
  });

  private newChar() {
    return this.formBuilder.group({
      color: [null, [Validators.required]],
      size: [null, [Validators.required]],
      type: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      count: [null, [Validators.required]],
    });
  }

  public addNewChar(e: Event) {
    e.preventDefault();
    this.chars.push(this.newChar());
  }

  public removeChar(i: number) {
    this.chars.removeAt(i);
  }

  public triggerInputImgs(ref: HTMLInputElement) {
    ref.click();
  }

  public changeImgs(e: Event) {
    this.imgs.set([]);
    this.productFbForm.value.imgs = [];

    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files) {
      const files = Array.from(inputElement.files);

      if (files.length > this.maxImgs) {
        alert(`You can only add up to ${this.maxImgs} files.`);
        this.productFbForm.patchValue({ imgs: [] });
        return;
      }

      this.productFbForm.value.imgs = [...files];

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (ev) => {
          const src = ev.target?.result;
          this.imgs.update((prev) => [...prev, { name: file.name, src: src }]);
        };

        reader.readAsDataURL(file);
      });

      console.log(files);
    }
  }

  onNoClick(): void {
    this.dialogRef.close('close using func');
  }
}
