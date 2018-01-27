import { Component, OnInit } from '@angular/core';
import { NotepadService } from '../notepad/notepad.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  isMin: boolean;
  isMax: boolean;
  currentLevel: number;
  displayLevaelPassing = 'none';

  constructor(public notepadService: NotepadService) { }
  number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ngOnInit() {
    // tslint:disable-next-line:no-eval
    this.isMin = eval('isMin()');
    // tslint:disable-next-line:no-eval
    this.isMax = eval('isMax()');
    let isPass = '0';
    // let isBanana = 0;
    this.notepadService.checkSubject
      .subscribe(() => {
        // tslint:disable-next-line:no-eval
        isPass = eval('diveLinker.Get(1516179390106)');
        if (isPass === '1') {
          this.displayLevaelPassing = 'block';
        } else {
          this.displayLevaelPassing = 'none';
        }
      });
    this.currentLevel = 1;
    // setTimeout(() => {
    //   // tslint:disable-next-line:no-eval
    //   this.currentLevel = eval('diveLinker.Get(1506435020252)');
    // }, 2500);
  }

  onClose() {
    this.notepadService.isClose = true;
    this.notepadService.display = 'none';
  }

  reset() {
    this.displayLevaelPassing = 'none';
    // tslint:disable-next-line:max-line-length
    const code = 'diveLinker.Send([{"id":1507359699948, "value":0}, {"id":1506435020252, "value":' + this.currentLevel + '},{"id":1505892241566, "value":' + this.currentLevel + '}]);';
    // tslint:disable-next-line:no-eval
    eval(code);
  }

  nextLevel() {
    this.currentLevel = Number(this.currentLevel) + 1;
    if (this.currentLevel > 10) {
      this.currentLevel = 1;
    }
    this.displayLevaelPassing = 'none';
    // tslint:disable-next-line:no-eval
    eval('addCurrentNum()');
    // tslint:disable-next-line:no-eval
    this.isMax = eval('isMax()');
    // tslint:disable-next-line:no-eval
    this.isMin = eval('isMin()');
  }

  onChange(number: number) {
    this.notepadService.display = 'none';
    this.currentLevel = number;
    // tslint:disable-next-line:no-eval
    eval('diveLinker.Send([{"id":1506435020252, "value":' + number + '},{"id":1505892241566, "value":' + number + '}]);');

  }

  nextBlock() {
    // tslint:disable-next-line:no-eval
    eval('addCurrentNum()');
    // tslint:disable-next-line:no-eval
    this.isMax = eval('isMax()');
    // tslint:disable-next-line:no-eval
    this.isMin = eval('isMin()');
  }

  lastBlock() {
    // tslint:disable-next-line:no-eval
    eval('subCurrentNum()');
    // tslint:disable-next-line:no-eval
    this.isMax = eval('isMax()');
    // tslint:disable-next-line:no-eval
    this.isMin = eval('isMin()');
  }

  onSelect(number: number) {
    this.notepadService.display = 'none';
  }
}
