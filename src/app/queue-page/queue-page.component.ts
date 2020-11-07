import { Component, OnInit } from '@angular/core';
var fila = [];
fila.push[1]

@Component({
  selector: 'app-queue-page',
  templateUrl: './queue-page.component.html',
  styleUrls: ['./queue-page.component.scss']
})

export class QueuePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getinQueue() {

    var last = fila.length-1;
    var current = last +1;
    fila.push(current);
    console.log(fila);

  }

}
