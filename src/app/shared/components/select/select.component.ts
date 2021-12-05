import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface SelectItem {
  value: string;
  stringItem: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent<T> implements OnInit {
  @Input() iconSrc: string = '';
  @Input() label: string = '';
  @Input() items: SelectItem[] = [];

  @Output() onChange = new EventEmitter<SelectItem>()

  isOpen: boolean = false;
  activeItem: SelectItem = { value: '', stringItem: '' };

  constructor() {}

  ngOnInit(): void {}

  handleToggleSelect() {
    this.isOpen = !this.isOpen;
  }

  setItem(item: SelectItem) {
    this.activeItem = item;
    this.onChange.emit(item)

    this.isOpen = false;
  }
}
