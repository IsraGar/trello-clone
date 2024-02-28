import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';
import { RecoveryFormComponent } from '../../components/recovery-form/recovery-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [CommonModule, BackgroundComponent, HeaderComponent, RecoveryFormComponent, FooterComponent],
  templateUrl: './recovery.component.html'
})
export class RecoveryComponent {

}
