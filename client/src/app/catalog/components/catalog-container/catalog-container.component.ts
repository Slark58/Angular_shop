import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FiltersUiComponent } from '../../../shared/modules/filters/components/filters-ui/filters-ui.component';
import { FiltersUiContainerComponent } from '../../../shared/modules/filters/components/filters-ui-container/filters-ui-container.component';

@Component({
  selector: 'app-catalog-container',
  standalone: true,
  imports: [FiltersUiContainerComponent],
  templateUrl: './catalog-container.component.html',
  styleUrls: ['./catalog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogContainerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
