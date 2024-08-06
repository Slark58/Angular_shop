import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TableComponent } from '../../../../../shared/modules/UI/table/table.component';
import { AdminProductsFacade } from '../../../data-access/src';

@Component({
  selector: 'app-admin-product-info',
  imports: [CommonModule, TableComponent],
  standalone: true,
  templateUrl: './admin-product-info.component.html',
  styleUrls: ['./admin-product-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductInfoComponent implements OnInit {
  private readonly adminProductsFacade = inject(AdminProductsFacade);

  public products$ = this.adminProductsFacade.products$;
  ngOnInit() {
    this.adminProductsFacade.getProducts();
  }
}
