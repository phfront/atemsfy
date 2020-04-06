import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-atemsfy-loading',
  templateUrl: './atemsfy-loading.component.html',
  styleUrls: ['./atemsfy-loading.component.scss']
})
export class AtemsfyLoadingComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
