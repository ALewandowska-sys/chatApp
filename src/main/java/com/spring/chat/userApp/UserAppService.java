package com.spring.chat.userApp;

import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserAppService {
    private final UserAppRepo userAppRepo;
    private final UserAppMapper userAppMapper = Mappers.getMapper(UserAppMapper.class);

    public UserAppService(UserAppRepo userAppRepo) {
        this.userAppRepo = userAppRepo;
    }

    public UserAppDto getUserByName(String username){
        return userAppMapper.toUserAppDto(userAppRepo.findByUsername(username).orElse(null));
    }

    public UserAppDto getUserById(Long id) {
        return userAppMapper.toUserAppDto(userAppRepo.findById(id).orElse(null));
    }

    public UserAppDto saveUser(UserAppDto userDto){
        checkUsernameIsUnique(userDto.getUsername());
        UserApp newUser = userAppRepo.save(userAppMapper.toUserAppEntity(userDto));
        return userAppMapper.toUserAppDto(newUser);
    }

    public UserAppDto updateUser(Long id, UserAppDto userAppDto){
        Optional<UserApp> userUpdate = userAppRepo.findById(id);
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
        return userAppMapper.toUserAppDto(userAppRepo.save(userApp));
    }

    public void deleteUser(Long id){
        Optional<UserApp> userDelete = userAppRepo.findById(id);
        userDelete.ifPresent(user -> userAppRepo.deleteById(id));
    }

    private void checkUsernameIsUnique(String username) {
        Optional<UserApp> userApp = userAppRepo.findByUsername(username);
        if(userApp.isPresent()){
            throw new RuntimeException("Username have to be unique");
        }
    }

    public Page<UserAppDto> getUsers() {
        Pageable pageable = PageRequest.of(0, 5, Sort.by("username"));
        return userAppRepo.findAll(pageable).map(userAppMapper::toUserAppDto);
    }
}
