package com.spring.chat.user;

public class FriendDto {
    private Long id;
    private String username;

    public FriendDto(Long id, String username) {
        this.id = id;
        this.username = username;
    }
    public FriendDto(){}

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
