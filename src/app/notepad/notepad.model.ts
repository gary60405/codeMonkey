import Blockly from 'node-blockly/browser';

export class Toolbox {
  public xmlText = `<xml id="toolbox" style="display: inline;">
                      <category name="Control">
                        <block type="step"></block>
                        <block type="turn"></block>
                        <block type="controls_if"></block>
                        <block type="controls_repeat_ext"></block>
                        <block type="logic_compare"></block>
                        <block type="math_number"></block>
                        <block type="math_arithmetic"></block>
                        <block type="text"></block>
                        <block type="text_print"></block>
                      </category>
                    </xml>`;
  public step = {
    init:
      function() {
        this.appendDummyInput()
            .appendField('step')
            .appendField(new Blockly.FieldNumber(0, 0), 'stepValue');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      }
  };
  public turn = {
    init:
      function() {
        this.appendDummyInput()
            .appendField('turn')
            .appendField(new Blockly.FieldAngle(0), 'angleValue');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      }
  };
  public turtle_step = {
    init: function() {
      this.appendDummyInput()
          .appendField('烏龜走')
          .appendField(new Blockly.FieldNumber(0, 0, 30), 'turtleStep')
          .appendField('步');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip('');
   this.setHelpUrl('');
    }
  };
}

export class GetCode {
  public stepValue = (block) => {
    const id = '1511104738945';
    const value = block.getFieldValue('stepValue');
    return `diveLinker.Send(${id}, ${value});`;
  }
  public angleValue = (block) => {
    const id = '1511104858728';
    const value = block.getFieldValue('angleValue');
    return `diveLinker.Send(${id}, ${value});`;
  }
}
