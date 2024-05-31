import { Component, Input, effect, inject, signal, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent  {

  @Input() isSignUp: boolean = false
  public authService = inject(AuthService)
  public message = signal<string[]>([])
  public hidePass = signal({
    pass1: true, 
    pass2: true,
  })
  public errorMessage: string = ''

  public authForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    secondPassword: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  public handleShowPassword(event: MouseEvent, key: "pass1" | "pass2") {
    event.stopPropagation();
    this.hidePass.update((prevObg) => ({
      ...prevObg,
      [key]: !prevObg[key]
    }));
  }


  public onSubmit() {
    const {email, name, password, phone, secondPassword} = this.authForm.value
    console.log(
      'email: ', email, 
      'name: ', name, 
      'password: ', password, 
      'phone: ', phone, 
    );
    
    if(this.isSignUp) {
      if(this.authForm.valid && password === secondPassword) {
        this.authService.register(email, name, password, phone)
      }
    } else {
      if(email && password) {
        this.authService.login(email, password)
      }
    }
  }


  updateErrorMessage() {
    this.authForm.controls.email.invalid
    if (this.authForm.controls.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.authForm.controls.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

}
