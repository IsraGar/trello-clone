import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BoardsService } from '../../../../services/boards.service';
import { Colors } from '../../../../models/colors.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonComponent],
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent {

  formBuilder = inject(FormBuilder);
  boardService= inject(BoardsService);
  route = inject(Router);

  @Output() closeOverlay = new EventEmitter<boolean>();

  form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    backgroundColor: new FormControl<Colors>('sky', {
      nonNullable: true,
      validators: 
      [Validators.required]
    })
  });

  constructor(){ }

  doSave(){
    if(this.form.valid){
      const { title, backgroundColor } = this.form.getRawValue();
      this.boardService.createBoard(title, backgroundColor)
      .subscribe(board => {
        this.closeOverlay.next(false);
        this.route.navigate(['/app/boards', board.id]);
      })
    }else{
      this.form.markAllAsTouched();
    }
  }

}
