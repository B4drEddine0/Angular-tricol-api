import { Component } from '@angular/core';
import { DeliveryNoteListComponent } from '../../components/delivery-notes/delivery-note-list/delivery-note-list.component';

@Component({
  selector: 'app-delivery-notes',
  standalone: true,
  imports: [DeliveryNoteListComponent],
  templateUrl: './delivery-notes.html',
  styleUrls: ['./delivery-notes.css']
})
export class DeliveryNotesComponent {}
