package com.spring.chat.userApp;

import org.mapstruct.Mapper;

@Mapper
public interface UserAppMapper {
    UserApp toUserAppEntity(UserAppDto userAppDto);
    UserAppDto toUserAppDto(UserApp userApp);
}
