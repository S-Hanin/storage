--liquibase formatted sql

--changeset author:snkhanin
insert into projects (name)
values ('СМК 001'),
       ('СМК 002'),
       ('СМК 003'),
       ('СМК 004'),
       ('СМК 005');

insert into documents (name, description, project_id, created_by, created_at)
values ('СМК 001.30', 'ЛДСП белый 16 200х100 с кромкой', 1, 'Ханин С.Н', now()),
       ('СМК 001.31', 'ЛДСП белый 16 1200х300 присадка/кромка', 1, 'Ханин С.Н', now());

insert into document_files (document_id, link, hash, created_by, created_at, version)
values (1, 'D:\Projects\drawings\Ванная_мебель\Ванная_мебель_Doc7_0.pdf', 'f6ea381e9a1522ad388d47327c9b8ca4719749d75d069ceb6dbce21afaf534ce', 'Ханин С.Н', now(), 0),
       (2, 'D:\Projects\drawings\Ванная_мебель\Ванная_мебель_Doc4_0.pdf', '33db5a8028f7b11fe43e38fc8c1e1c48514d137b1d7ef360d27967550f0866b6', 'Ханин С.Н', now(), 0);