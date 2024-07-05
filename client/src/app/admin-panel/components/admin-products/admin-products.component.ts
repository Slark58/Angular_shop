import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductCharForm } from '../../../models/Form';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { LastLetterPipePipe } from '../../../utils/pipes/LastLetterPipe.pipe';
import { Store } from '@ngrx/store';
import { selectProducts } from '../../data-access/admin.selectors';
import { selectFilters } from '../../../catalog/data-access/state/catalog.selectors';
import { MatInputModule } from '@angular/material/input';
import { AdminActions } from '../../data-access/admin.actions';
import { Observable, take } from 'rxjs';
import { IFiltersResponse } from '../../../catalog/types/filterResponse.interface';
import { AdminFacade } from '../../data-access/admin.facade';
import { CreateProductInterface } from '../../types/createProduct.interface';

interface IImgSig {
  imgView: {
    src: string | ArrayBuffer | null | undefined;
    name: string;
  }[];
  imgFormValue: File[];
}

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    LastLetterPipePipe,
  ],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductsComponent implements OnInit {
  private readonly adminFacade = inject(AdminFacade);
  public filters$?: Observable<IFiltersResponse[]>;
  public formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  public maxImgs: number = 3;
  public imgs = signal<IImgSig>({} as IImgSig);

  ngOnInit(): void {
    this.filters$ = this.adminFacade.getFilters().pipe(take(1));
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
    chars: this.formBuilder.array<ProductCharForm>([]),
    info: this.formBuilder.array<{ title: string; description: string }[]>([]),
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
      imgFormValue: [],
      imgView: [],
    });

    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files) {
      const files = Array.from(inputElement.files);

      console.log(files);
      console.log(inputElement.value);

      if (files.length > this.maxImgs) {
        alert(`You can only add up to ${this.maxImgs} files.`);
        this.imgs.set({
          imgFormValue: [],
          imgView: [],
        });
        return;
      }

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (ev) => {
          const src = ev.target?.result;
          this.imgs.update((prev) => ({
            ...prev,
            imgView: [...prev.imgView, { name: file.name, src: src }],
            imgFormValue: [...files],
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
    this.imgs().imgFormValue.forEach((file, i) => {
      formData.append('imgs', file);
    });
    formData.append('chars', JSON.stringify(chars));
    formData.append('info', JSON.stringify(info));

    formData.forEach((value, key) => {
      console.log(key, value);
    });
    this.adminFacade.createProduct(formData);
  }
}
