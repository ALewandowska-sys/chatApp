package com.spring.chat.comment;

import com.spring.chat.post.Post;
import com.spring.chat.userProfile.UserProfile;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@ApiModel
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String content;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private UserProfile author;
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    public Comment() {}

    public Comment(Long id, String content, UserProfile author, Post post) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.post = post;
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public UserProfile getAuthor() {
        return author;
    }

    public void setAuthor(UserProfile author) {
        this.author = author;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
