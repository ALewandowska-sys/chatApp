package com.spring.chat.user;

import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public UserDto getUserByName(String username){
        return userMapper.toUserDto(userRepo.findByUsername(username).orElse(null));
    }

    public UserDto getUserById(Long id) {
        return userMapper.toUserDto(userRepo.findById(id).orElse(null));
    }

    public UserDto saveUser(UserDto userDto){
        checkUsernameIsUnique(userDto.getUsername());
        User newUser = userRepo.save(userMapper.toUserEntity(userDto));
        return userMapper.toUserDto(newUser);
    }

    public UserDto updateUser(Long id, UserDto userDto){
        Optional<User> userUpdate = userRepo.findById(id);
        if(userUpdate.isEmpty()){
            throw new RuntimeException("There is any user with id: " + id);
        }
        User user = userUpdate.get();
        if(userDto.getUsername() != null){
            checkUsernameIsUnique(userDto.getUsername());
            user.setUsername(userDto.getUsername());
        }
        if(userDto.getPassword() != null){
            user.setPassword(userDto.getPassword());
        }
        return userMapper.toUserDto(userRepo.save(user));
    }

    public void deleteUser(Long id){
        Optional<User> userDelete = userRepo.findById(id);
        userDelete.ifPresent(user -> userRepo.deleteById(id));
    }

    private void checkUsernameIsUnique(String username) {
        Optional<User> user = userRepo.findByUsername(username);
        if(user.isPresent()){
            throw new RuntimeException("Username have to be unique");
        }
    }

    public Page<UserDto> getUsers() {
        Pageable pageable = PageRequest.of(0, 5, Sort.by("username"));
        return userRepo.findAll(pageable).map(userMapper::toUserDto);
    }

    public String testRepo() {
        return userRepo.findAll().toString();
    }
}
