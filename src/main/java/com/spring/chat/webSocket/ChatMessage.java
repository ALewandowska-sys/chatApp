package com.spring.chat.webSocket;

import com.spring.chat.userApp.UserApp;

public class ChatMessage {
    private String value;
    private UserApp userToSend;

    public ChatMessage(String value) {
        this.value = value;
    }
    public ChatMessage() {
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
