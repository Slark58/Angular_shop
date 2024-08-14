import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  handle(start: number, end: number) {
    return [...Array(start - end).keys()].map((el) => el + start);
  }

  ngOnInit() {
    console.log(this.handle(5, 3));
  }
}
