package com.spring.chat.userProfile;

import com.spring.chat.city.CityDto;
import com.spring.chat.userApp.UserAppDto;

import java.time.LocalDate;

public class UserProfileDto {
    private Long id;
    private String firstname;
    private String lastname;
    private LocalDate birthDate;
    private String description;
    private UserAppDto userAppDto;
    private CityDto cityDto;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserAppDto getUserAppDto() {
        return userAppDto;
    }

    public void setUserAppDto(UserAppDto userAppDto) {
        this.userAppDto = userAppDto;
    }

    public CityDto getCityDto() {
        return cityDto;
    }

    public void setCityDto(CityDto cityDto) {
        this.cityDto = cityDto;
    }
}
