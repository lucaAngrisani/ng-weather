import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  standalone: true,
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  imports: [
    NgTemplateOutlet,
    JsonPipe,
  ]
})
export class TabsComponent {

  @ContentChildren(TabComponent) content = new QueryList<TabComponent>();

  @Output() onSelect: EventEmitter<number> = new EventEmitter();
  @Output() onRemove: EventEmitter<number> = new EventEmitter();

  @Input() activatedIndex: number = 0;
  @Output() activatedIndexChange: EventEmitter<number> = new EventEmitter();

  @Input() emptyMessage: string = 'No data to show';

  constructor() { }

  select(index: number) {
    this.activatedIndex = index;
    this.onSelect.emit(index);
  }

  remove(index: number) {
    if (index <= this.activatedIndex)
      this.activatedIndex = this.activatedIndex - 1 >= 0 ? this.activatedIndex - 1 : 0;
    this.onRemove.emit(index);
  }

}
