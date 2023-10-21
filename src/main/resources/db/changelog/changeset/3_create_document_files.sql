--liquibase formatted sql

--changeset author:snkhanin
create table document_files (
    id serial primary key,
    document_id serial not null,
    link varchar(1024) unique not null,
    hash varchar(1024) unique not null,
    created_by varchar(1024) not null,
    created_at timestamp not null,
    version integer not null
)
--rollback drop table parts