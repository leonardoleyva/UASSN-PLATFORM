import { Component, Input } from '@angular/core';

type AvatarSize = 'xs' | 'sm' | 'md';
type BorderRadiusSize = 'xs' | 'sm' | 'md';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() userId: string = '';
  @Input() userName: string = '';
  @Input() src: string = '';
  @Input() size: AvatarSize = 'md';
  @Input() isOnline: boolean = false;
  @Input() borderRadius: BorderRadiusSize = 'md';
}
