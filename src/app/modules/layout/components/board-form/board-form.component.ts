import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonComponent],
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent {

  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    title: [''],
    backgroundColor: ['']
  });

  constructor(){ }

  doSave(){
    if(this.form.valid){
      const { title, backgroundColor } = this.form.getRawValue();
      console.log(title, backgroundColor);      
    }else{
      this.form.markAllAsTouched();
    }
  }

}
