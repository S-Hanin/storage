--liquibase formatted sql

--changeset author:snkhanin
create table documents (
    id serial primary key,
    name varchar(255) unique not null,
    description varchar(255) not null,
    project_id serial not null,
    created_by varchar(1024) not null,
    created_at timestamp not null
)
--rollback drop table parts