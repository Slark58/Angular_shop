import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { Store, select } from '@ngrx/store';
import { loginAction } from '../../store/actions/login.action';
import { loadingSelector } from '../../store/selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent implements OnInit {
  public readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  public readonly store: Store = inject(Store);
  public isActivePass = signal(false);
  public errorMessage = signal('');

  public isLoading$ = this.store.pipe(select(loadingSelector));

  public loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  ngOnInit() {}

  toggleVisionPassword() {
    this.isActivePass.update((prev) => !prev);
  }

  onSubmit() {
    console.log('click');

    if (this.loginForm.valid) {
      const request = {
        email: this.loginForm.getRawValue().email,
        password: this.loginForm.getRawValue().password,
      };
      console.log(request);

      this.store.dispatch(loginAction({ request }));
    }
  }

  updateErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.loginForm.controls.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
}
