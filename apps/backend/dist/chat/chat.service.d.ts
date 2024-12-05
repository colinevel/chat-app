export declare class ChatService {
    private messages;
    saveMessage(message: {
        sender: string;
        content: string;
    }): {
        sender: string;
        content: string;
        timestamp: Date;
    };
    getMessages(): {
        sender: string;
        content: string;
        timestamp: Date;
    }[];
}
