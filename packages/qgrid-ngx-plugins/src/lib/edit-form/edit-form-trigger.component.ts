import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'q-grid-edit-form-trigger',
  templateUrl: './edit-form-trigger.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFormTriggerComponent {
  @Input() caption: string;
  @Input() row: unknown;

  // eslint-disable-next-line no-use-before-define
  context: { $implicit: EditFormTriggerComponent } = {
    $implicit: this,
  };
}
