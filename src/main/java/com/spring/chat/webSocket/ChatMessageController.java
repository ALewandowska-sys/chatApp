package com.spring.chat.webSocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatMessageController {

    @MessageMapping("/chat")
    //dla kazdego uzytkownia inna i zamiast messages to bedzie polaczenie
    @SendTo("/topic/messages")
    public ChatMessage get(ChatMessage chatMessage) {
        return chatMessage;
    }

}
