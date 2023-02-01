package com.spring.chat.user;

import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {
    FriendDto toFriendDto(UserDto userDto);
    User toUserEntity(UserDto userDto);
    UserDto toUserDto(User user);
}
