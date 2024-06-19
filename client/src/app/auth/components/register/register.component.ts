import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { registerAction } from '../../store/actions/register.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public fb: FormBuilder = inject(FormBuilder);
  public readonly store: Store = inject(Store);
  public emailErrorMessage = signal('');
  public hidePass = signal({
    pass1: true,
    pass2: true,
  });

  public registerForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    phone: ['', Validators.required],
  });

  public handleShowPassword(event: MouseEvent, key: 'pass1' | 'pass2') {
    event.stopPropagation();
    this.hidePass.update((prevObg) => ({
      ...prevObg,
      [key]: !prevObg[key],
    }));
  }

  public onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    if (
      this.registerForm.value.confirmPassword !==
      this.registerForm.value.password
    ) {
      console.log('Passwords do not match');
      return;
    }

    const request = {
      name: this.registerForm.getRawValue().name,
      email: this.registerForm.getRawValue().email,
      password: this.registerForm.getRawValue().password,
      phone: this.registerForm.getRawValue().password,
    };
    console.log(request);

    this.store.dispatch(registerAction({ request }));
  }

  updateEmailErrorMessage() {
    if (this.registerForm.controls.email.hasError('required')) {
      this.emailErrorMessage.set('You must enter a value');
    } else if (this.registerForm.controls.email.hasError('email')) {
      this.emailErrorMessage.set('Not a valid email');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  ngOnInit() {}
}
