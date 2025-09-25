create table usuarios(
idUsuario serial primary key,
nome varchar(100) not null,
email varchar(100) unique not null,
senha varchar(255) not null
);
-- só pode incluir um novo usuário quem tiver a senha de administrador

create table eventos(
idEventos serial,
nome varchar(100) not null,
dataInicio timestamp,
dataFinal timestamp,
descricao varchar(1000),
endereco varchar(1000),
idUsuario int,
FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE
)


create table post(
idPost
idUsuario
dataPublic
conteudo 
confere_imagem
)







