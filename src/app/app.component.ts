import { Component } from '@angular/core';
import { NavbarComponent } from './modules/layout/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './modules/layout/components/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, HttpClientModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'trello-clone';
}
