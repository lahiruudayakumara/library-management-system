import { ChatComponent } from "../../../shared/components/chat/chat.component";
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-chat',
  standalone: true,
  imports: [ChatComponent],
  templateUrl: './admin-chat.component.html',
  styleUrl: './admin-chat.component.scss'
})
export class AdminChatComponent {

}
