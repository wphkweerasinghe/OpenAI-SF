import { LightningElement, track } from 'lwc';

export default class AiChat extends LightningElement {
    @track chatMessages = [];
    @track userInput = '';



    handleUserInput(event) {
        this.userInput = event.target.value;
    }



    async sendMessage() {
        if (this.userInput.trim() === '') {
            return;
        }



        const message = {
            type: 'user',
            content: this.userInput
        };



        this.chatMessages.push(message);
        this.userInput = '';



        try {
            const response = await fetch('YOUR_CHATGPT_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message.content })
            });



            const data = await response.json();
            const botMessage = {
                type: 'bot',
                content: data.message
            };



            this.chatMessages.push(botMessage);
            this.scrollToBottom();
        } catch (error) {
            console.error('Error:', error);
        }
    }



    scrollToBottom() {
        const chatWindow = this.template.querySelector('.chat-window');
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}