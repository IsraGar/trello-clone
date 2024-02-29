import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CustomValidators } from '../../../../utils/validators';
import { AuthService } from '../../../../services/auth.service';
import { RequestStatus } from '../../../../models/request-status.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recovery-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, FontAwesomeModule],
  templateUrl: './recovery-form.component.html'
})
export class RecoveryFormComponent {

  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  token: string = '';
  message: string = '';

  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    }
  );
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  constructor(private formBuilder: FormBuilder) {
    this.route.queryParamMap.subscribe(params => {
      const token = params.get('token');
      if(token){
        this.token = token;
      }else{
        this.router.navigate(['/']);
      }
    }
    )
  }

  recovery() {
    if (this.form.valid) {
      const { newPassword } = this.form.getRawValue();
      this.status = 'loading';
      this.authService.changePassword(this.token, newPassword)
      .subscribe({
        next: () =>{
          this.status = 'success';
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.status = 'failed';
          if(error.error = 'Unauthorized'){
            this.message = 'Invalid token';
          }
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

}
