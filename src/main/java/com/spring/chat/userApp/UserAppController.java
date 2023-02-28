package com.spring.chat.userApp;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class UserAppController {
    private final UserAppService userAppService;

    public UserAppController(UserAppService userAppService) {
        this.userAppService = userAppService;
    }

    @GetMapping
    public Page<UserAppDto> getUsers(){
        return userAppService.getUsers();
    }

    @GetMapping("/byName/{username}")
    public UserAppDto getUserByName(@RequestParam(value = "username") String username){
        return userAppService.getUserByName(username);
    }

    @GetMapping("/byId/{userId}")
    public UserAppDto getUserById(@RequestParam(value = "userId") Long userId){
        return userAppService.getUserById(userId);
    }

    @PostMapping
    public UserAppDto saveUser(@RequestBody UserAppDto userAppDto){
        return userAppService.saveUser(userAppDto);
    }

    @PutMapping("/{userId}")
    public UserAppDto updateUser(@RequestBody UserAppDto userAppDto,
                              @PathVariable("userId") Long userId){
        return userAppService.updateUser(userId, userAppDto);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        userAppService.deleteUser(userId);
    }
}
