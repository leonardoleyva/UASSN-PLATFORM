import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ChatMember, Message } from 'src/services/chat/type';
import { getImageURL } from 'src/services/utils/functions';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, AfterViewChecked {
  @Input() userId: string = '';
  @Input() members: ChatMember[] = [];
  @Input() convMember: ChatMember = {
    name: '',
    userId: '',
  };
  @Input() messages: Message[] | null = null;
  @Output() onClose = new EventEmitter();
  @Output() onSubmit = new EventEmitter();
  @ViewChild('scrollMe') private myScrollContainer: ElementRef | undefined;

  isSmoothScroll: boolean = false;
  value: { text: string } = {
    text: '',
  };
  isEmojiSelectorOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.scrollToBottom();

    setTimeout(() => {
      this.isSmoothScroll = true;
    }, 1500);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  handleSubmit() {
    if (!this.value.text) return;

    this.onSubmit.emit(this.value);
    this.value.text = '';
    this.isEmojiSelectorOpen = false;
  }

  handleSelectEmoji(emojiEvent: {
    $event: PointerEvent;
    emoji: { native: string };
  }) {
    this.value.text += emojiEvent.emoji.native;
  }

  handleToggleEmojiSelector() {
    this.isEmojiSelectorOpen = !this.isEmojiSelectorOpen;
    console.log(this.isEmojiSelectorOpen);
  }

  handleEmojiSelectorBlur() {
    this.isEmojiSelectorOpen = false;
  }

  handleClose() {
    this.onClose.emit();
  }

  scrollToBottom(): void {
    try {
      if (!this.myScrollContainer) return;
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer?.nativeElement.scrollHeight;
    } catch (err) {}
  }

  getImage(userId: string) {
    return getImageURL(userId, '/users');
  }
}
