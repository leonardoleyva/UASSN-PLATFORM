import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
      const base64Img: any = await this.toBase64(imageFile);
      this.value.image = base64Img;
    } catch (error) {
      this.value.image = undefined;
      console.error(error);
    }
  }

  toBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  handleSubmit() {
    if (!this.value.text && !this.value.image) return;

    this.onSubmit.emit(this.value);

    this.isEmojiSelectorOpen = false;
    this.value.text = '';
    this.value.image = '';
  }

  handleBlur() {
    console.log('asdasd');
  }
}
