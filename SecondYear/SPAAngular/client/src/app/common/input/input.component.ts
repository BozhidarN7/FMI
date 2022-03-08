import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() name = 'asdf';
  @Input() inputValue = '';
  @Output() value = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  inputChange(userInput: string) {
    this.value.emit(userInput);
  }
}
