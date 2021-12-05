import { Component, Input } from '@angular/core';

type AvatarSize = 'sm' | 'md';
type BorderRadiusSize = 'sm' | 'md';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() userName: string = '';
  @Input() src: string = '';
  @Input() size: AvatarSize = 'md';
  @Input() isOnline: boolean = false;
  @Input() borderRadius: BorderRadiusSize = 'md';
}
