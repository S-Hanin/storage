--liquibase formatted sql

--changeset author:snkhanin
create table projects (
    id serial primary key,
    name varchar(255) not null
)
--rollback drop table projects