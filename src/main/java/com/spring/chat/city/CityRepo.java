package com.spring.chat.city;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepo extends JpaRepository<City, Long> {
}
