package com.spring.chat.userProfile;

import com.spring.chat.city.CityDto;
import com.spring.chat.city.CityService;
import com.spring.chat.generic.AbstractService;
import com.spring.chat.userApp.UserAppService;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileService extends AbstractService<UserProfile, UserProfileDto, UserProfileRepo, UserProfileMapper> {
    private final CityService cityService;
    private final UserAppService userAppService;
    private static final UserProfileMapper mapper = Mappers.getMapper(UserProfileMapper.class);

    public UserProfileService(UserProfileRepo repository, CityService cityService, UserAppService userAppService) {
        super(repository, mapper);
        this.cityService = cityService;
        this.userAppService = userAppService;
    }

    @Override
    public UserProfileDto save(UserProfileDto userProfileDto){
        userProfileDto.setUserAppDto(userAppService.getById(userProfileDto.getUserAppDto().getId()));
        userProfileDto.setCityDto(cityService.getById(userProfileDto.getCityDto().getId()));
        return mapper.mapToDto(repository.save(mapper.mapToEntity(userProfileDto)));
    }

    @Override
    public UserProfileDto update(Long id, UserProfileDto userProfileDto){
        Optional<UserProfile> userUpdate = repository.findById(id);
        if(userUpdate.isEmpty()){
            throw new RuntimeException("There is any user with id: " + id);
        }
        UserProfile user = userUpdate.get();
        if(userProfileDto.getFirstname() != null){
            user.setFirstname(userProfileDto.getFirstname());
        }
        if(userProfileDto.getDescription() != null){
            user.setDescription(userProfileDto.getDescription());
        }
        if(userProfileDto.getBirthDate() != null){
            user.setBirthDate(userProfileDto.getBirthDate());
        }
        if(userProfileDto.getLastname() != null){
            user.setLastname(userProfileDto.getLastname());
        }
        if(userProfileDto.getCityDto() != null){
            CityDto city = cityService.getById(userProfileDto.getCityDto().getId());
            user.setCity(cityService.getMapper().mapToEntity(city));
        }
        return mapper.mapToDto(repository.save(user));
    }
}
