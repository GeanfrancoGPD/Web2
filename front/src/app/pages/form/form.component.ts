import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Input() submit!: () => void;
  @Input() title: string = '';

  constructor() {}

  ngOnChanges() {}

  onSubmit() {
    if (this.submit) {
      this.submit();
    } else {
      console.warn('No submit function provided');
    }
  }
}
