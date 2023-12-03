import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  @ViewChild('template', { static: true }) template!: TemplateRef<any>;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
