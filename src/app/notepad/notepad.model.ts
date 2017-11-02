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
}

export class GetCode {
  public stepValue = (block) => {
    const stepValue = block.getFieldValue('stepValue');
    return 'step += ' + stepValue + ';\n';
  }
  public angleValue = (block) => {
    const angleValue = block.getFieldValue('angleValue');
    return 'angle += ' + angleValue + ';\n';
  }
}