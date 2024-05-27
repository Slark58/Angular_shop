import { Component, Input, effect, signal, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent  {

  @Input() isSignUp: boolean = false

  message = signal<string[]>([])
  hidePass = signal({
    pass1: false, 
    pass2: false,
  })

  handleShowPassword(event: MouseEvent, key: "pass1" | "pass2") {
    
  this.hidePass.update((prevObg) => ({
    ...prevObg,
    [key]: !prevObg[key]
  }));
    event.stopPropagation();
  }

  public errorMessage: string = ''

  public formData = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(3)])
  })

  

  updateErrorMessage() {
    this.formData.controls.email.invalid
    if (this.formData.controls.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.formData.controls.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

}
