import { CompileService } from './compile.service';
import { Injectable } from '@angular/core';
import { ShareService } from './../share/share.service';
import Blockly from 'node-blockly/browser';
import zhHant from 'node-blockly/lib/i18n/zh-hant';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class NotepadService {
  workspace: any;
  isClose = false;
  display = 'none';

  constructor(private shareService: ShareService,
              private compileService: CompileService) {}

  checkSubject = new Subject();

init(toolBox) {
  Blockly.setLocale(zhHant);
  this.injectToWorkspace(toolBox.xmlText);
  Blockly.Blocks['turtle_step'] = toolBox.turtle_step;
  Blockly.Blocks['turtle_turn'] = toolBox.turtle_turn;
  Blockly.Blocks['monkey_step'] = toolBox.monkey_step;
  Blockly.Blocks['monkey_turn'] = toolBox.monkey_turn;
  Blockly.Blocks['mouse_step'] = toolBox.mouse_step;
  Blockly.Blocks['mouse_turn'] = toolBox.mouse_turn;
  Blockly.Blocks['grab'] = toolBox.grab;
  Blockly.Blocks['drop'] = toolBox.drop;
  // console.log(Blockly.Xml.blockToDom(this.workspace.newBlock('step')));
  // console.log(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.workspace)));
    // tslint:disable-next-line:max-line-length
    const text = `<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables></variables>
  <block type="grab" id="(@H,6dyaHbMPb@^NqQm%" x="195" y="105">
    <next>
      <block type="controls_repeat_ext" id="eKrvm)=u9:]YA$^zE07U">
        <value name="TIMES">
          <block type="math_number" id="Q_rcUC2Ub+44$})Ff-:c">
            <field name="NUM">8</field>
          </block>
        </value>
        <statement name="DO">
          <block type="mouse_step" id="vx.YD[P*C_T:?Al~#b,p">
            <field name="mouseStep">10</field>
            <next>
              <block type="grab" id="KT::BNz}F6?@~/z5Pm$%">
                <next>
                  <block type="mouse_turn" id=")ZUBtj7lzX~tm~clTR4P">
                    <field name="monkeyTurn">180</field>
                    <next>
                      <block type="mouse_step" id="/1+^l(ysi5/R3)MV9ZX~">
                        <field name="mouseStep">10</field>
                        <next>
                          <block type="drop" id="ZYGUu,^Wi/5g[wo\`5gwf">
                            <next>
                              <block type="mouse_turn" id=":}1vdF+MPn,{;{2oL^3b">
                                <field name="monkeyTurn">180</field>
                                <next>
                                  <block type="mouse_turn" id="y6~AJ;_fjG]GK!$;)/)\`">
                                    <field name="monkeyTurn">135</field>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>`;
    const xml = Blockly.Xml.textToDom(text);
    Blockly.Xml.appendDomToWorkspace(xml, this.workspace);
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
  console.log(Blockly.Xml.domToPrettyText(dom));
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
  this.checkSubject.next();
}

async DOMParser(dom: any, target: string) {
    let id: string;
    let value: string;
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
      id = '1511104738945';
      value = dom.childNodes[0].innerHTML;
      console.log(`烏龜走${value}步`);
    } else if (dom.getAttribute('type') === 'turtle_turn') {
      id = '1511104858728';
      value = dom.childNodes[0].innerHTML;
      console.log(`烏龜轉${value}度`);
    } else if (dom.getAttribute('type') === 'monkey_step') {
      id = '1511104362549';
      value = dom.childNodes[0].innerHTML;
      console.log(`猴子走${value}步`);
    } else if (dom.getAttribute('type') === 'monkey_turn') {
      id = '1511104719544';
      value = dom.childNodes[0].innerHTML;
      console.log(`猴子轉${value}度`);
    } else if (dom.getAttribute('type') === 'mouse_step') {
      id = '1511104362549';
      value = dom.childNodes[0].innerHTML;
      console.log(`老鼠走${value}步`);
    } else if (dom.getAttribute('type') === 'mouse_turn') {
      id = '1511104719544';
      value = dom.childNodes[0].innerHTML;
      console.log(`老鼠轉${value}度`);
    } else if (dom.getAttribute('type') === 'grab') {
      id = '1516696065727';
      value = '1';
      console.log(`拿火柴`);
    } else if (dom.getAttribute('type') === 'drop') {
      id = '1516696065727';
      value = '0';
      console.log(`放火柴`);
    }
    // tslint:disable-next-line:no-eval
    eval(`diveLinker.Send(${id}, ${value});`);
    console.log(`diveLinker.Send(${id}, ${value});`);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // console.log(Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(this.workspace)));/
}
