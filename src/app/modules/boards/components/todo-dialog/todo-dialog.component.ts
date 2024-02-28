import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, faCheckToSlot, faBars, faUser, faTag, faCheckSquare, faClock } from '@fortawesome/free-solid-svg-icons';
import { ToDo } from '../../../../models/todo.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface InputData {
  todo: ToDo
}

interface OutputData {
  rta: boolean
}

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [ButtonComponent, FontAwesomeModule],
  templateUrl: './todo-dialog.component.html'
})
export class TodoDialogComponent {

  todo: ToDo;

  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  constructor(private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) data: InputData
    ){
      this.todo = data.todo;
    }

  close(){
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean){
    this.dialogRef.close({rta});
  }

}
