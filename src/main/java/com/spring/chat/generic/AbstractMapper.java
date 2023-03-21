package com.spring.chat.generic;

public interface AbstractMapper <E, D> {
    D mapToDto(E e);
    E mapToEntity(D d);
}
