package com.spring.chat;

public class ChatMessage {
    private String value;

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
