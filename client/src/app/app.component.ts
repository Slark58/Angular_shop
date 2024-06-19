import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { checkAuthAction } from './auth/store/actions/checkAuth.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'project';

  private store: Store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(checkAuthAction());
  }
}
