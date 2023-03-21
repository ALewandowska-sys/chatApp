package com.spring.chat.reaction;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;

@ApiModel
@Entity
@Table(name="dict_reaction")
public class Reaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String name;

    public Reaction(){}

    public Reaction(Long id, String name) {
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
