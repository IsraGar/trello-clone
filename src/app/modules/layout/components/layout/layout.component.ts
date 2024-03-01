import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit{

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getProfile().subscribe();
  }

}
