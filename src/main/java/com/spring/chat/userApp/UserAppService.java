package com.spring.chat.userApp;

import com.spring.chat.generic.AbstractService;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserAppService extends AbstractService<UserApp, UserAppDto, UserAppRepo, UserAppMapper> {
    private static final UserAppMapper mapper = Mappers.getMapper(UserAppMapper.class);

    public UserAppService(UserAppRepo repository) {
        super(repository, mapper);
    }

    @Override
    public UserAppDto save(UserAppDto userDto){
        checkUsernameIsUnique(userDto.getUsername());
        UserApp newUser = repository.save(mapper.mapToEntity(userDto));
        return mapper.mapToDto(newUser);
    }

    @Override
    public UserAppDto update(Long id, UserAppDto userAppDto){
        Optional<UserApp> userUpdate = repository.findById(id);
        if(userUpdate.isEmpty()){
            throw new RuntimeException("There is any user with id: " + id);
        }
        UserApp userApp = userUpdate.get();
        if(userAppDto.getUsername() != null){
            checkUsernameIsUnique(userAppDto.getUsername());
            userApp.setUsername(userAppDto.getUsername());
        }
        if(userAppDto.getPassword() != null){
            userApp.setPassword(userAppDto.getPassword());
        }
        return mapper.mapToDto(repository.save(userApp));
    }

    private void checkUsernameIsUnique(String username) {
        Optional<UserApp> userApp = repository.findByUsername(username);
        if(userApp.isPresent()){
            throw new RuntimeException("Username have to be unique");
        }
    }

    public UserAppDto getUserByName(String username) {
        Optional<UserApp> userApp = repository.findByUsername(username);
        if(userApp.isPresent()){
            return mapper.mapToDto(userApp.get());
        } else {
            throw new RuntimeException("There is any user with this username");
        }
    }
}
