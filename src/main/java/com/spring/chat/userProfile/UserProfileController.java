package com.spring.chat.userProfile;

import com.spring.chat.generic.AbstractController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user-profile")
public class UserProfileController extends AbstractController<UserProfile, UserProfileDto, UserProfileRepo, UserProfileMapper, UserProfileService> {

    public UserProfileController(UserProfileService service) {
        super(service);
    }
}
