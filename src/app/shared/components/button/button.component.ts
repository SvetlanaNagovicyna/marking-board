import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() isLink: boolean = false;
  @Input() disabled: boolean = false;
  @Input() linkUrl: string = '';
  @Input() type: string = '';
  @Input() classes: string = '';
}
