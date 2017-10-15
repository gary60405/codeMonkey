import { NotepadService } from './notepad.service';
import { Component, OnInit } from '@angular/core';
import Blockly from 'node-blockly/browser';
import { Toolbox, GetCode } from './notepad.model';


@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.css'],
  providers: [Toolbox, GetCode]
})
export class NotepadComponent implements OnInit {

  constructor(private toolBox: Toolbox,
              private getCode: GetCode,
              private notepadService: NotepadService) {}

  ngOnInit() {
    this.notepadService.init(this.toolBox);
  }

  onGenerate() {
    this.notepadService.getCode(this.getCode);
  }

}
