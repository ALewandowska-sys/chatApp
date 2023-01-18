package com.spring.chat.controller;

import com.spring.chat.webSocket.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatMessageController {

    @MessageMapping("/chat")
    //moze byc kolejka dla kazdego uzytkownia inna i zamiast messages to bedzie polaczenie
    @SendTo("/topic/messages")
    public ChatMessage get(ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat")
    //moze byc kolejka dla kazdego uzytkownia inna i zamiast messages to bedzie polaczenie
    @SendTo("/topic/messages2")
    public ChatMessage get2(ChatMessage chatMessage) {
        return chatMessage;
    }

}
