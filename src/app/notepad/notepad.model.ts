import Blockly from 'node-blockly/browser';

export class Toolbox {
  public xmlText = `<xml id="toolbox" style="display: inline;">
                      <category name="猴子與烏龜">
                        <block type="turtle_step"></block>
                        <block type="turtle_turn"></block>
                        <block type="monkey_step"></block>
                        <block type="monkey_turn"></block>
                      </category>
                      <category name="老鼠抓火柴">
                        <block type="turtle_step"></block>
                        <block type="turtle_turn"></block>
                        <block type="monkey_step"></block>
                        <block type="monkey_turn"></block>
                        <block type="math_number"></block>
                        <block type="controls_repeat_ext"></block>
                      </category>
                    </xml>`;

  public turtle_step = {
    init:
      function() {
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
  public turtle_turn = {
    init:
      function() {
        this.appendDummyInput()
            .appendField('烏龜轉')
            .appendField(new Blockly.FieldAngle(0), 'turtleTurn')
            .appendField('度');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
  };
  public monkey_step = {
    init:
      function() {
        this.appendDummyInput()
            .appendField('猴子走')
            .appendField(new Blockly.FieldNumber(0, 0, 30), 'monkeyStep')
            .appendField('步');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
  };
  public monkey_turn = {
    init:
      function() {
        this.appendDummyInput()
            .appendField('猴子轉')
            .appendField(new Blockly.FieldAngle(0), 'monkeyTurn')
            .appendField('度');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
  };
}

export class GetCode {
  public turtleStep = (block) => {
    const id = '1511104738945';
    const value = block.getFieldValue('turtleStep');
    return `diveLinker.Send(${id}, ${value});`;
  }
  public turtleTurn = (block) => {
    const id = '1511104858728';
    const value = block.getFieldValue('turtleTurn');
    return `diveLinker.Send(${id}, ${value});`;
  }
  public monkeyStep = (block) => {
    const id = '1511104738945';
    const value = block.getFieldValue('monkeyStep');
    return `diveLinker.Send(${id}, ${value});`;
  }
  public monkeyTurn = (block) => {
    const id = '1511104858728';
    const value = block.getFieldValue('monkeyTurn');
    return `diveLinker.Send(${id}, ${value});`;
  }
}
