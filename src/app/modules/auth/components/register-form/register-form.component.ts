import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../utils/validators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RequestStatus } from '../../../../models/request-status.model';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, ButtonComponent],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {

  private authService = inject(AuthService);
  message: string = '';

  formUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]]
  });

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this.authService.registerAndLogin(name, email, password)
      .subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/app/boards']);
        },
        error: (error) => {
          if (error.error.code === 'SQLITE_CONSTRAINT_UNIQUE'){
            this.message = 'This user already exists. Do you want to login?'
          }
          this.status = 'failed';
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser(){
    if (this.formUser.valid){
      this.statusUser = 'loading';
      const { email } = this.formUser.getRawValue();
      this.authService.isAvailable(email)
      .subscribe({
        next: (rta) => {
          this.statusUser = 'success';
          if(rta.isAvailable){
            this.form.controls.email.setValue(email);
            this.showRegister = true;
          }else{
            this.router.navigate(['/'], {
              queryParams: { email }
            });
          }
        },
        error: () => {
          this.statusUser = 'failed';
        }
      })
    }else{
      this.formUser.markAllAsTouched();
    }
  }

}
