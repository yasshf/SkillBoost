import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChatbotService } from 'app/services/chatbot.service';

interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
    messages: ChatMessage[] = [];
    messageInput = new FormControl('', [Validators.required]);
    isLoading = false;
    isChatVisible = false;
  
    constructor(private chatbotService: ChatbotService) {}
  
    ngOnInit(): void {
      // Add a welcome message when the component initializes
      this.messages.push({
        content: 'Hello! How can I help you today?',
        isUser: false,
        timestamp: new Date()
      });
    }
  
    toggleChat(): void {
      this.isChatVisible = !this.isChatVisible;
      if (this.isChatVisible) {
        // When opening the chat, scroll to the bottom to see latest messages
        setTimeout(() => this.scrollToBottom(), 100);
      }
    }
  
    sendMessage(): void {
      if (this.messageInput.invalid || this.isLoading) {
        return;
      }
  
      const userMessage = this.messageInput.value!;
      
      // Add user message to the chat
      this.messages.push({
        content: userMessage,
        isUser: true,
        timestamp: new Date()
      });
  
      // Clear input field
      this.messageInput.reset();
      
      // Show loading state
      this.isLoading = true;
  
      // Send message to service and get response
      this.chatbotService.sendMessage(userMessage).subscribe({
        next: (response) => {
          this.messages.push({
            content: response,
            isUser: false,
            timestamp: new Date()
          });
          this.isLoading = false;
          this.scrollToBottom();
        },
        error: (error) => {
          console.error('Error sending message:', error);
          this.messages.push({
            content: 'Sorry, I encountered an error. Please try again later.',
            isUser: false,
            timestamp: new Date()
          });
          this.isLoading = false;
          this.scrollToBottom();
        }
      });
    }
  
    scrollToBottom(): void {
      setTimeout(() => {
        const chatContainer = document.querySelector('.chat-messages');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    }
  }