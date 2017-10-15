import { NotepadService } from './../notepad/notepad.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dropdownIsOpen: Boolean = false;
  modalIsOpen: Boolean = false;
  constructor(private notepadService: NotepadService) { }

  ngOnInit() {
  }

  onToggle() {
    this.dropdownIsOpen = !this.dropdownIsOpen;
  }

  onOpenModal() {
    this.notepadService.display = 'block';
  }

}
