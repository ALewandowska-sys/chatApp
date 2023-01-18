package com.spring.chat;

import io.swagger.annotations.ApiModel;
import jakarta.persistence.*;

import java.util.Set;

@ApiModel
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String password;
    private Set<User> favourite;

}
