package com.spring.chat.userApp;

import com.spring.chat.generic.AbstractController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user-app")
public class UserAppController extends AbstractController<UserApp, UserAppDto, UserAppRepo, UserAppMapper, UserAppService> {

    public UserAppController(UserAppService service) {
        super(service);
    }

    @GetMapping("/byName/{username}")
    public UserAppDto getUserByName(@RequestParam(value = "username") String username){
        return service.getUserByName(username);
    }

}
