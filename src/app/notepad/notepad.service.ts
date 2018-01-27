import { CompileService } from './compile.service';
import { Injectable } from '@angular/core';
import { ShareService } from './../share/share.service';
import Blockly from 'node-blockly/browser';
import zhHant from 'node-blockly/lib/i18n/zh-hant';

@Injectable()
export class NotepadService {
  workspace: any;
  isClose = false;
  display = 'none';

  constructor(private shareService: ShareService,
              private compileService: CompileService) {}

init(toolBox) {
  Blockly.setLocale(zhHant);
  this.injectToWorkspace(toolBox.xmlText);
  Blockly.Blocks['turtle_step'] = toolBox.turtle_step;
  Blockly.Blocks['turtle_turn'] = toolBox.turtle_turn;
  Blockly.Blocks['monkey_step'] = toolBox.monkey_step;
  Blockly.Blocks['monkey_turn'] = toolBox.monkey_turn;
  // console.log(Blockly.Xml.blockToDom(this.workspace.newBlock('step')));
  // console.log(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.workspace)));
    // tslint:disable-next-line:max-line-length
    // const text = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="step" id="8GeI6$)I!9^ed);,re|5" x="15" y="75"><field name="stepValue">2</field><next><block type="turn" id="P3`p,wT+@LWfgkvWS|:`"><field name="angleValue">330</field><next><block type="controls_repeat_ext" id="n34rv=!j]q,hZX-NiG*G"><value name="TIMES"><block type="math_number" id="lM;7!jDF5Mi}XthZ1xr@"><field name="NUM">3</field></block></value><statement name="DO"><block type="step" id="m~~;7N}uWUbOXn!;D(##"><field name="stepValue">1</field><next><block type="turn" id="Z%9aKcGfFi7(8c]ZRir1"><field name="angleValue">225</field></block></next></block></statement><next><block type="turn" id=")Dww23b*aYqwo.L*-kvX"><field name="angleValue">45</field></block></next></block></next></block></next></block></xml>';
    // const xml = Blockly.Xml.textToDom(text);
    // Blockly.Xml.appendDomToWorkspace(xml, this.workspace);
}

injectToWorkspace(xml: string) {
  this.workspace = Blockly.inject('blocklyDiv', {
    toolbox: Blockly.Xml.textToDom(xml),
    grid: {
      spacing: 30,
      length: 3,
      colour: '#39261f',
      snap: true
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 1.2,
      minScale: 0.8,
      scaleSpeed: 1.2
    },
  });
}
async getCode(value: any) {
  // Blockly.JavaScript['turtle_step'] = value.turtleStep;
  // Blockly.JavaScript['turtle_turn'] = value.turtleTurn;
  // Blockly.JavaScript['monkey_step'] = value.monkeyStep;
  // Blockly.JavaScript['monkey_turn'] = value.monkeyTurn;
  // const code = Blockly.JavaScript.workspaceToCode(this.workspace).split(';').reverse();
  // let i = code.length;
  // while (i--) {
  //   console.log(code[i]);
  //   // tslint:disable-next-line:no-eval
  //   eval(code[i]);
  //   await this.sleep(2000);
  // }
  // console.log(Blockly.JavaScript.workspaceToCode(this.workspace));
  let dom = Blockly.Xml.workspaceToDom(this.workspace);
  while (dom !== null) {
    await this.sleep(1000);
    console.log(dom);
    const block = dom.querySelector('block');
    await this.DOMParser(block, '');
    if (block.getAttribute('type') === 'controls_repeat_ext') {
      dom = dom.querySelectorAll('block>next')[1];
    } else {
      dom = dom.querySelector('block>next');
    }
  }
}

async DOMParser(dom: any, target: string) {
    if (dom.getAttribute('type') === 'controls_repeat_ext') {
      let times = dom.querySelector('field[name="NUM"]').childNodes[0].nodeValue;
      const childNodes = [];
      while (times--) {
        let iterDOM = dom.querySelector('statement[name="DO"]');
        while (iterDOM !== null) {
          const block = iterDOM.querySelector('block');
          await this.sleep(2000);
          this.DOMParser(block, '');
          if (block.getAttribute('type') === 'controls_repeat_ext') {
            iterDOM = iterDOM.querySelectorAll('block>next')[1];
          } else {
            iterDOM = iterDOM.querySelector('block>next');
          }
        }
      }
    } else if (dom.getAttribute('type') === 'turtle_step') {
      const id = '1511104738945';
      const value = dom.childNodes[0].innerHTML;
      // tslint:disable-next-line:no-eval
      eval(`diveLinker.Send(${id}, ${value});`);
    } else if (dom.getAttribute('type') === 'turtle_turn') {
      const id = '1511104858728';
      const value = dom.childNodes[0].innerHTML;
      // tslint:disable-next-line:no-eval
      eval(`diveLinker.Send(${id}, ${value});`);
    } else if (dom.getAttribute('type') === 'monkey_step') {
      const id = '1511104362549';
      const value = dom.childNodes[0].innerHTML;
      // tslint:disable-next-line:no-eval
      eval(`diveLinker.Send(${id}, ${value});`);
    } else if (dom.getAttribute('type') === 'monkey_turn') {
      const id = '1511104719544';
      const value = dom.childNodes[0].innerHTML;
      // tslint:disable-next-line:no-eval
      eval(`diveLinker.Send(${id}, ${value});`);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // console.log(Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(this.workspace)));/
}
