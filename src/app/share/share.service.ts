import { Injectable } from '@angular/core';
import Blockly from 'node-blockly/browser';

@Injectable()
export class ShareService {

  constructor() { }

  genBlock(type, value = 0, isIner = true, block = '') {
    const id = `id="${Blockly.utils.genUid()}"`;
    const position = isIner ? '' : 'x="225" y="50"';
    const name = `name="${type}Value"`;
    return `<block type="${type}" ${id} ${position}><field ${type}>${value}</field>${block}</block>`;
  }


  wrapNext(block) {
    return `<next>${block}</next>`;
  }

  wrapXml(content) {
    return `<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables>${content}</xml>`;
  }
}
