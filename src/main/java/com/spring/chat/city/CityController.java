package com.spring.chat.city;

import com.spring.chat.generic.AbstractController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/city")
public class CityController extends AbstractController<City, CityDto, CityRepo, CityMapper, CityService> {

    public CityController(CityService service) {
        super(service);
    }
}
