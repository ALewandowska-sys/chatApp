package com.spring.chat.user;

import io.swagger.annotations.ApiModel;
import jakarta.persistence.*;
//import javax.persistence.*;

import java.util.Set;

@ApiModel
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
//    @ManyToMany
//    private Set<User> favourite;

    public User(Long id, String username, String password, Set<User> favourite) {
        this.id = id;
        this.username = username;
        this.password = password;
//        this.favourite = favourite;
    }
    public User(){}

    public Long getId() {
        return id;
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

//    public Set<User> getFavourite() {
//        return favourite;
//    }
//
//    public void setFavourite(Set<User> favourite) {
//        this.favourite = favourite;
//    }
}
