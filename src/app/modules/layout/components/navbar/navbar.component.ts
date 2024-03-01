import { Component, OnInit, inject } from '@angular/core';
import { BtnComponent } from '../../../../components/btn/btn.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { TokenService } from '../../../../services/token.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule, FontAwesomeModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{

  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  user$ =  this.authService.user$;

  faBell = faBell;
  faInfoCircle = faInfoCircle;

  isOpen = false;

  constructor(){    
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isValidToken(){
    console.log(this.tokenService.isValidToken());
  }

}
