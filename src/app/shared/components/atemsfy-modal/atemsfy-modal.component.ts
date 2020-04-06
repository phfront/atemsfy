import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-atemsfy-modal',
  templateUrl: './atemsfy-modal.component.html',
  styleUrls: ['./atemsfy-modal.component.scss']
})
export class AtemsfyModalComponent implements OnInit {

  @Input() show: boolean;
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
