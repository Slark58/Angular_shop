import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { Paths } from '../../app-routing.module';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  authService = inject(AuthService)

}
