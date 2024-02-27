import { Component, OnInit } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BtnComponent, OverlayModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{

  isOpen = false;
  name: string = 'Isra Garcia';
  email: string = 'isra@mail.com';

  constructor(){}

  ngOnInit(): void {    
  }

}
