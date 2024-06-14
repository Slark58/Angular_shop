import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

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
  public errorMessage = signal('');
  public hidePass = signal({
    pass1: true,
    pass2: true,
  });

  public form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    firstPassword: ['', Validators.required],
    secondPassword: ['', Validators.required],
    phone: ['', Validators.required],
  });

  public handleShowPassword(event: MouseEvent, key: 'pass1' | 'pass2') {
    event.stopPropagation();
    this.hidePass.update((prevObg) => ({
      ...prevObg,
      [key]: !prevObg[key],
    }));
  }

  public onSubmit() {}

  updateErrorMessage() {
    if (this.form.controls.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.form.controls.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  ngOnInit() {}
}
