package com.spring.chat.friendCategory;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;

@ApiModel
@Entity
@Table(name="dict_friend_category")
public class FriendCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String name;

    public FriendCategory(){}

    public FriendCategory(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
