package com.spring.chat.userApp;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@ApiModel
@Entity
@Table(name="user_app")
public class UserApp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    public UserApp(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public UserApp(){}

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
