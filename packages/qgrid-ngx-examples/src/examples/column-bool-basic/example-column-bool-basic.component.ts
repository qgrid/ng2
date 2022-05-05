import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GridModel, Grid } from 'ng2-qgrid';

const EXAMPLE_TAGS = ['column-bool-basic', 'Cell value is boolean'];

@Component({
  selector: 'example-column-bool-basic',
  templateUrl: 'example-column-bool-basic.component.html',
  styleUrls: ['example-column-bool-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleColumnBoolBasicComponent {
  static tags = EXAMPLE_TAGS;
  title = EXAMPLE_TAGS[1];

  rows = [
    {
      'true': true,
      'false': false,
      'null': null,
      'undefined': undefined,
      'yesNo': 'yes',
      'noYes': 'no',
      'nullYesNo': null,
      'triggerFocus': true,
      'triggerClick': false,
      'customTemplate': true,
    },
  ];

  gridModel: GridModel = this.qgrid
    .model()
    .columnList({
      generation: 'deep',
    })
    .data({
      columns: [
        {
          key: 'true',
          title: 'True',
          width: '100',
          type: 'bool',
        },
        {
          key: 'false',
          title: 'False',
          width: '100',
          type: 'bool',
        },
        {
          key: 'undefined',
          title: 'Undefined',
          width: '100',
          type: 'bool',
        },
        {
          key: 'null',
          title: 'Null',
          width: '100',
          type: 'bool',
        },
        {
          key: 'yesNo',
          title: 'Yes/No',
          trueValue: 'yes',
          falseValue: 'no',
          width: '100',
          type: 'bool',
        },
        {
          key: 'noYes',
          title: 'No/Yes',
          trueValue: 'yes',
          falseValue: 'no',
          width: '100',
          type: 'bool',
        },
        {
          key: 'nullYesNo',
          title: 'Null/Yes/No',
          trueValue: 'yes',
          falseValue: 'no',
          width: '100',
          type: 'bool',
        },
        {
          key: 'triggerFocus',
          title: 'Trigger Focus',
          width: '120',
          editorOptions: {
            trigger: 'focus',
          },
          type: 'bool',
        },
        {
          key: 'triggerClick',
          title: 'Trigger click',
          width: '120',
          editorOptions: {
            trigger: 'click',
          },
          type: 'bool',
        },
        {
          key: 'customTemplate',
          title: 'Custom Template',
          width: '120',
          viewWidth: 300,
          editorOptions: {
            trigger: 'focus',
          },
          type: 'bool',
        },
      ],
    });

  constructor(private qgrid: Grid) { }

}
