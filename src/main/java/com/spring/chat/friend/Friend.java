package com.spring.chat.friend;

import com.spring.chat.friendCategory.FriendCategory;
import com.spring.chat.userProfile.UserProfile;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@ApiModel
@Entity
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    @ColumnDefault(value = "false")
    private Boolean accepted;
    @ManyToOne
    @JoinColumn(name = "user1_id")
    private UserProfile user1;
    @ManyToOne
    @JoinColumn(name = "user2_id")
    private UserProfile user2;
    @ManyToOne
    @JoinColumn(name = "category1_id")
    private FriendCategory category1;
    @ManyToOne
    @JoinColumn(name = "category2_id")
    private FriendCategory category2;

    public Friend() {}

    public Friend(Long id, Boolean accepted, UserProfile user1, UserProfile user2, FriendCategory category1, FriendCategory category2) {
        this.id = id;
        this.accepted = accepted;
        this.user1 = user1;
        this.user2 = user2;
        this.category1 = category1;
        this.category2 = category2;
    }

    public Long getId() {
        return id;
    }

    public Boolean getAccepted() {
        return accepted;
    }

    public void setAccepted(Boolean accepted) {
        this.accepted = accepted;
    }

    public UserProfile getUser1() {
        return user1;
    }

    public void setUser1(UserProfile user1) {
        this.user1 = user1;
    }

    public UserProfile getUser2() {
        return user2;
    }

    public void setUser2(UserProfile user2) {
        this.user2 = user2;
    }

    public FriendCategory getCategory1() {
        return category1;
    }

    public void setCategory1(FriendCategory category1) {
        this.category1 = category1;
    }

    public FriendCategory getCategory2() {
        return category2;
    }

    public void setCategory2(FriendCategory category2) {
        this.category2 = category2;
    }
}
