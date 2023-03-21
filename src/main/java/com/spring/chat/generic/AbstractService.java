package com.spring.chat.generic;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public abstract class AbstractService <E, D, R extends JpaRepository<E, Long>, M extends AbstractMapper<E, D>> {

    public final R repository;
    public final M mapper;

    protected AbstractService(R repository, M mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public D getById(Long id) {
        return mapper.mapToDto(repository.findById(id).orElseThrow());
    }

    public D save(D d){
        return mapper.mapToDto(repository.save(mapper.mapToEntity(d)));
    }

    public D update(Long id, D d){
        Optional<E> update = repository.findById(id);
        if(update.isEmpty()){
            throw new RuntimeException("Cannot find with id: " + id);
        }
        E e = update.get();
        return mapper.mapToDto(repository.save(e));
    }

    public void delete(Long id){
        Optional<E> cityDelete = repository.findById(id);
        cityDelete.ifPresent(city -> repository.deleteById(id));
    }

    public Page<D> getAll(Pageable pageable) {
        return repository.findAll(pageable).map(mapper::mapToDto);
    }
}
