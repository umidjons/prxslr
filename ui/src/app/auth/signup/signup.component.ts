import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastsManager } from "ng2-toastr";

@Component({
  selector: 'prx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  form: FormGroup;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              public toastr: ToastsManager,
              private router: Router) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      password2: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  signUp() {
    if (this.form.valid) {
      if (this.form.value.password !== this.form.value.password2) {
        this.toastr.error('Пароли не совпадает!');
        return;
      }

      this.auth
        .signUp(this.form.value.email, this.form.value.password)
        .subscribe((resp) => {
          if (resp.success === true) {
            this.toastr.success(`Письмо для подтверждение почты отправлен на ${this.form.value.email}!`);
            this.router.navigate(['home/signin']);
          } else {
            if (resp.error) {
              this.toastr.error(resp.error);
            } else {
              this.toastr.error('Something is wrong.');
            }
          }
        });
    }
  }
}
