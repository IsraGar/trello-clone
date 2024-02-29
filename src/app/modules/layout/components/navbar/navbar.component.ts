import { Component, OnInit, inject } from '@angular/core';
import { BtnComponent } from '../../../../components/btn/btn.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule, FontAwesomeModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{

  private authService = inject(AuthService);
  private router = inject(Router);

  faBell = faBell;
  faInfoCircle = faInfoCircle;

  isOpen = false;
  name: string = 'Isra Garcia';
  email: string = 'isra@mail.com';

  constructor(){    
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
