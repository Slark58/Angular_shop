import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'project';

  authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.authService.checkAuth();
  }
}
