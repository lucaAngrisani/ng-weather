import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabListEl } from '../models/tab-list-el.type';

@Component({
  standalone: true,
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  imports: []
})
export class TabsComponent implements OnInit {

  @Input() list: TabListEl[] = [];
  @Input() selectedItem: TabListEl = null;

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onRemove: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
