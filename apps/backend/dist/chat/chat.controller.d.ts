export declare class ChatController {
    private messages;
    sendMessage(message: {
        sender: string;
        content: string;
    }): {
        message: string;
    };
    getMessages(): {
        sender: string;
        content: string;
    }[];
}
