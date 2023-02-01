package com.spring.chat.user;

import java.util.Set;

public class UserDto {
    private Long id;
    private String username;
    private String password;
    private Set<FriendDto> favourite;

    public UserDto(Long id, String username, String password, Set<FriendDto> favourite) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.favourite = favourite;
    }
    public UserDto(){}

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<FriendDto> getFavourite() {
        return favourite;
    }

    public void setFavourite(Set<FriendDto> favourite) {
        this.favourite = favourite;
    }
}
