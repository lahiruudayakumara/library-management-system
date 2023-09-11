import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  // A simple list of messages
  messages: { sender: string, text: string }[] = [
    { sender: 'Bot', text: 'Hello! How can I help you today?' }
  ];

  // The message input
  newMessage: string = '';

  // Function to add a new message
  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: 'User', text: this.newMessage });
      this.newMessage = ''; // Reset the input field
      this.scrollToBottom(); // Scroll to the newest message
    }
  }

  // Scroll to the bottom of the chat container
  scrollToBottom(): void {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
}
