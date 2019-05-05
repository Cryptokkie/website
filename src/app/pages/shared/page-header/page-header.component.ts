import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { CurrentProfileService } from 'src/app/core/current-profile.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input()
  icon: string;

  @Input()
  thumb: string;

  @Input()
  title: string;

  constructor(public auth: AuthService, public profileService: CurrentProfileService) { }

  ngOnInit() {
  }

}
