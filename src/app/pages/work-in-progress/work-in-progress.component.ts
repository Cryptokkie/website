import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-in-progress',
  templateUrl: './work-in-progress.component.html',
  styleUrls: ['./work-in-progress.component.scss']
})
export class WorkInProgressComponent implements OnInit {

  gifs = [
    'https://media.giphy.com/media/tn3kTJo4P4y1G/giphy.gif',
    'https://media.giphy.com/media/RRerwvHrb0nxm/giphy.gif',
    'https://media.giphy.com/media/11BbGyhVmk4iLS/giphy.gif',
    'https://media.giphy.com/media/3oriO7A7bt1wsEP4cw/giphy.gif',
    'https://media.giphy.com/media/mMC0JKqNxvBXDjF5E2/giphy.gif'
  ];

  randomGif = '';

  constructor() { }

  ngOnInit() {
    this.randomGif = this.gifs[Math.floor(Math.random() * this.gifs.length)];
  }
}
