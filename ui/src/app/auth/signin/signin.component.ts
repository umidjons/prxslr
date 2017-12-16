import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'prx-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  form: FormGroup;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              public toastr: ToastsManager,
              private router: Router) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  signIn() {
    if (this.form.valid) {
      this.auth
        .signIn(this.form.value.email, this.form.value.password)
        .subscribe((resp) => {
          if (resp.success === true) {
            this.toastr.success(`Welcome to a board ${this.form.value.email}!`);
            this.router.navigate(['dashboard']);
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
