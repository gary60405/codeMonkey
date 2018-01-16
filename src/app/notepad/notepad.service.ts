import { Injectable } from '@angular/core';
import { ShareService } from './../share/share.service';
import Blockly from 'node-blockly/browser';
import zhHant from 'node-blockly/lib/i18n/zh-hant';

@Injectable()
export class NotepadService {
  workspace: any;
  isClose = false;
  display = 'none';

  constructor(private shareService: ShareService) {}

init(toolBox) {
  Blockly.setLocale(zhHant);
  this.injectToWorkspace(toolBox.xmlText);
  Blockly.Blocks['step'] = toolBox.step;
  Blockly.Blocks['turn'] = toolBox.turn;
  // console.log(Blockly.Xml.blockToDom(this.workspace.newBlock('step')));
  // console.log(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.workspace)));

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

getCode(value: any) {
  Blockly.JavaScript['step'] = value.stepValue;
  Blockly.JavaScript['turn'] = value.angleValue;
  let code = 'var step = 0;\nvar angle = 0;\n';
  code += Blockly.JavaScript.workspaceToCode(this.workspace);
  code += 'diveLinker.Send([{"id":1504878465618, "value":step},{"id":1504853805902, "value":angle}]);';
  // tslint:disable-next-line:no-eval
  eval(code);
  console.log(code);
  console.log(this.workspace.getAllBlocks());
  // const text = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="step" id="tE@sqea=Q6zu?D%#gy`b" x="0" y="1"><field name="stepValue">0</field></block><block type="step" id="!G9Rie~AwM%S|sx};2bi" x="0" y="30"><field name="stepValue">0</field></block><block type="step" id="qwVM8[X-e}_`!P=MyM:h" x="0" y="60"><field name="stepValue">0</field></block></xml>';
  // const xml = Blockly.Xml.textToDom(text);
  // Blockly.Xml.appendDomToWorkspace(xml, this.workspace);
  console.log(Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(this.workspace)));
}



}
