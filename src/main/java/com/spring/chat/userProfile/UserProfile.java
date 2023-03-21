package com.spring.chat.userProfile;

import com.spring.chat.city.City;
import com.spring.chat.userApp.UserApp;
import io.swagger.annotations.ApiModel;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@ApiModel
@Entity
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstname;
    private String lastname;
    @Column(name = "birth_date")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate birthDate;
    private String description;
    @OneToOne
    @JoinColumn(name = "user_app_id", nullable = false)
    private UserApp userApp;
    @OneToOne
    @JoinColumn(name = "city_id")
    private City city;

    public UserProfile() {
    }

    public UserProfile(Long id, String firstname, String lastname, LocalDate  birthDate, String description, UserApp userApp, City city) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthDate = birthDate;
        this.description = description;
        this.userApp = userApp;
        this.city = city;
    }

    public Long getId() {
        return id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public LocalDate  getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate  birthDate) {
        this.birthDate = birthDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserApp getUserApp() {
        return userApp;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }
}
