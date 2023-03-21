package com.spring.chat.userProfile;

import com.spring.chat.generic.AbstractMapper;
import org.mapstruct.Mapper;

@Mapper
public interface UserProfileMapper extends AbstractMapper<UserProfile, UserProfileDto> {
}
