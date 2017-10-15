import Blockly from 'node-blockly/browser';
import zhHant from 'node-blockly/lib/i18n/zh-hant';

export class NotepadService {
  workspace: any;
  isClose = false;
  display = 'none';

  constructor() {}

init(toolBox) {
  Blockly.setLocale(zhHant);
  this.injectToWorkspace(toolBox.xmlText);
  Blockly.Blocks['step'] = toolBox.step;
  Blockly.Blocks['turn'] = toolBox.turn;
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
}



}
