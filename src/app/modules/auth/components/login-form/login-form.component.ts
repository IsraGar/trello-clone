import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';
import { RequestStatus } from '../../../../models/request-status.model';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, ButtonComponent, HttpClientModule],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  private authService = inject(AuthService);

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe(params => {
      const email = params.get('email');
      if (email) {
        this.form.controls.email.setValue(email);
      }
    })
  }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();

      this.authService.isAvailable(email).subscribe(response => {
        if (!response.isAvailable) {
          this.authService.login(email, password)
            .subscribe({
              next: () => {
                this.status = 'success';
                this.router.navigate(['/app/boards']);
              },
              error: () => {
                this.status = 'failed';
              }
            })
        }else{
          this.status = 'success';
          this.message = 'This user is not registered yet.';
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
