import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent {
  form = new FormGroup({
    time: new FormControl('', [
      Validators.max(60)
    ])
  })

  isLink: boolean = true;

  submit() {
    console.log(this.form.value.time)
  }

  changeTypeButton(event: Event): void {
    this.isLink = false;
    console.log(event)
  }

}
