import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-likes',
  standalone: true,
  templateUrl: './profile-likes.component.html',
  styleUrls: ['./profile-likes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileLikesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
