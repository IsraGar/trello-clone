import { Component, OnInit } from '@angular/core';
import { BtnComponent } from '../../../../components/btn/btn.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule, FontAwesomeModule, RouterLink],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{

  faBell = faBell;
  faInfoCircle = faInfoCircle;

  isOpen = false;
  name: string = 'Isra Garcia';
  email: string = 'isra@mail.com';

  constructor(){}

  ngOnInit(): void {    
  }

}