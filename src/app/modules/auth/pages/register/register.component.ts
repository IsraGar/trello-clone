import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, BackgroundComponent, HeaderComponent, RegisterFormComponent, FooterComponent, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

}
