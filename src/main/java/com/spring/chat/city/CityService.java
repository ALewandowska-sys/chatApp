package com.spring.chat.city;

import com.spring.chat.generic.AbstractService;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CityService extends AbstractService<City, CityDto, CityRepo, CityMapper> {
    private static final CityMapper mapper = Mappers.getMapper(CityMapper.class);

    protected CityService(CityRepo repository) {
        super(repository, mapper);
    }

    @Override
    public CityDto update(Long id, CityDto cityDto){
        Optional<City> cityUpdate = repository.findById(id);
        if(cityUpdate.isEmpty()){
            throw new RuntimeException("There is any city with id: " + id);
        }
        City city = cityUpdate.get();
        if(cityDto.getName() != null){
            city.setName(cityDto.getName());
        }
        return mapper.mapToDto(repository.save(city));
    }

    public CityMapper getMapper() {
        return mapper;
    }
}
