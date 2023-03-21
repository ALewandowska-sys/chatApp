package com.spring.chat.generic;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

public abstract class AbstractController <E, D, R extends JpaRepository<E, Long>, M extends AbstractMapper<E, D>, S extends AbstractService<E, D, R, M>> {
    public final S service;

    protected AbstractController(S service) {
        this.service = service;
    }

    @GetMapping
    public Page<D> getAll(Pageable pageable){
        return service.getAll(pageable);
    }

    @GetMapping("/byId/{id}")
    public D getById(@RequestParam(value = "id") Long id){
        return service.getById(id);
    }

    @PostMapping
    public D save(@RequestBody D dto){
        return service.save(dto);
    }

    @PutMapping("/{id}")
    public D update(@RequestBody D dto,
                              @PathVariable("id") Long id){
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }
}
