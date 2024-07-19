import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { AdminProductsFacade } from '../../../data-access/src';
import { IFiltersResponse } from '../../../../../catalog/types/filterResponse.interface';
import { Observable, take } from 'rxjs';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { IImgSig } from '../../../data-access/src/lib/models/imgsSignal.interface';

@Component({
  selector: 'app-admin-products-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-products-container.component.html',
  styleUrls: ['./admin-products-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductsContainerComponent implements OnInit {
  private readonly adminProductFacade = inject(AdminProductsFacade);
  public filters$?: Observable<IFiltersResponse[]>;
  public formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  public maxImgs: number = 3;
  public imgs = signal<IImgSig>({} as IImgSig);

  ngOnInit(): void {
    this.filters$ = this.adminProductFacade.getFilters().pipe(take(1));
  }

  public get chars(): FormArray {
    return this.productFbForm.get('chars') as FormArray;
  }
  public get info(): FormArray {
    return this.productFbForm.get('info') as FormArray;
  }

  public productFbForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
    oldPrice: ['', [Validators.required]],
    colorId: ['', [Validators.required]],
    chars: this.formBuilder.array([]),
    info: this.formBuilder.array([]),
  });

  private newInfo() {
    return this.formBuilder.group({
      title: ['', []],
      description: ['', []],
    });
  }

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
  public addNewInfo(e: Event) {
    e.preventDefault();
    this.info.push(this.newInfo());
  }

  public removeChar(i: number) {
    this.chars.removeAt(i);
  }
  public removeImfo(i: number) {
    this.info.removeAt(i);
  }

  public triggerInputImgs(ref: HTMLInputElement) {
    ref.click();
  }

  public changeImgs(e: Event) {
    this.imgs.set({
      imgForFormValue: [],
      imgForView: [],
    });

    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files) {
      const files = Array.from(inputElement.files);

      console.log(files);
      console.log(inputElement.value);

      if (files.length > this.maxImgs) {
        alert(`You can only add up to ${this.maxImgs} files.`);
        this.imgs.set({
          imgForFormValue: [],
          imgForView: [],
        });
        return;
      }

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (ev) => {
          const src = ev.target?.result;
          this.imgs.update((prev) => ({
            ...prev,
            imgForView: [...prev.imgForView, { name: file.name, src: src }],
            imgForFormValue: [...files],
          }));
        };

        reader.readAsDataURL(file);
      });

      console.log(this.imgs());
    }
  }

  public onSubmit() {
    const { chars, name, oldPrice, colorId, price, info } =
      this.productFbForm.getRawValue();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('oldPrice', oldPrice);
    formData.append('colorId', colorId);
    this.imgs().imgForFormValue.forEach((file, i) => {
      formData.append('imgs', file);
    });
    formData.append('chars', JSON.stringify(chars));
    formData.append('info', JSON.stringify(info));

    formData.forEach((value, key) => {
      console.log(key, value);
    });
    this.adminProductFacade.createProduct(formData);
  }
}
