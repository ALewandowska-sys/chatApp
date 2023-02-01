package com.spring.chat.user;

import io.swagger.annotations.ApiModel;
import javax.persistence.*;

import javax.persistence.Entity;
import java.util.Set;

@ApiModel
@Entity
@Table(name="user_model")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String username;
    private String password;
    @ManyToMany(targetEntity = User.class, cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinTable(name = "FRIEND", joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "friend_id")})
    private Set<User> friends;

    @ManyToMany(mappedBy = "friends", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private Set<User> usersFriend;

    public User(Long id, String username, String password, Set<User> friends, Set<User> usersFriend) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.friends = friends;
        this.usersFriend = usersFriend;
    }
    public User(){}

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

    public Set<User> getFriends() {
        return friends;
    }

    public void setFriends(Set<User> friends) {
        this.friends = friends;
    }

    public Set<User> getUsersFriend() {
        return usersFriend;
    }

    public void setUsersFriend(Set<User> usersFriend) {
        this.usersFriend = usersFriend;
    }
}
