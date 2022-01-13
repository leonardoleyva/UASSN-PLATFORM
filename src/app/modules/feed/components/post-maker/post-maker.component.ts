import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { toBase64 } from 'src/app/shared/utils/image';

export interface PostMakerValue {
  text: string;
  image?: string;
}

@Component({
  selector: 'app-post-maker',
  templateUrl: './post-maker.component.html',
  styleUrls: ['./post-maker.component.scss'],
})
export class PostMakerComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<PostMakerValue>();

  value: PostMakerValue = {
    text: '',
  };
  isEmojiSelectorOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  handleSelectEmoji(emojiEvent: {
    $event: PointerEvent;
    emoji: { native: string };
  }) {
    this.value.text += emojiEvent.emoji.native;
  }

  handleToggleEmojiSelector() {
    this.isEmojiSelectorOpen = !this.isEmojiSelectorOpen;
  }

  async handleChooseImg(ev: any) {
    try {
      const imageFile = ev.target.files[0];
      const base64Img = (await toBase64(imageFile)) as string;
      this.value.image = base64Img;
    } catch (error) {
      this.value.image = undefined;
      console.error(error);
    }
  }

  handleSubmit() {
    if (!this.value.text && !this.value.image) return;

    this.onSubmit.emit(this.value);

    this.isEmojiSelectorOpen = false;
    this.value.text = '';
    this.value.image = '';
  }

  handleBlur() {
    console.log('Blur');
  }
}
