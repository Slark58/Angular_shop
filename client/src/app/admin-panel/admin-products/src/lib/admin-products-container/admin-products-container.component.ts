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
import { TableComponent } from '../../../../../shared/modules/UI/table/table.component';
import { AdminProductInfoComponent } from '../admin-product-info/admin-product-info.component';
import { AdminProductCreateComponent } from '../admin-product-create/admin-product-create.component';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-admin-products-container',
  standalone: true,
  imports: [
    CommonModule,
    AdminProductInfoComponent,
    AdminProductCreateComponent,
    RouterModule,
  ],
  templateUrl: './admin-products-container.component.html',
  styleUrls: ['./admin-products-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductsContainerComponent {}
