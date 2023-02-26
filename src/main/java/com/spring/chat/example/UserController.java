package com.spring.chat.example;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Page<UserDto> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/byName/{username}")
    public UserDto getUserByName(@RequestParam(value = "username") String username){
        return userService.getUserByName(username);
    }

    @GetMapping("/byId/{userId}")
    public UserDto getUserById(@RequestParam(value = "userId") Long userId){
        return userService.getUserById(userId);
    }

    @PostMapping
    public UserDto saveUser(@RequestBody UserDto userDto){
        return userService.saveUser(userDto);
    }

    @PutMapping("/{userId}")
    public UserDto updateUser(@RequestBody UserDto userDto,
                              @PathVariable("userId") Long userId){
        return userService.updateUser(userId, userDto);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        userService.deleteUser(userId);
    }
}
