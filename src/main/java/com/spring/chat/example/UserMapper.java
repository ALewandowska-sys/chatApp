package com.spring.chat.example;

import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {
    User toUserEntity(UserDto userDto);
    UserDto toUserDto(User user);
}
