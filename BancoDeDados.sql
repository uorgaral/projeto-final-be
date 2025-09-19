create table usuarios(
idUsuario serial primary key,
nome varchar(100) not null,
email varchar(100) unique not null,
senha varchar(8) not null
);
-- só pode incluir um novo usuário quem tiver a senha de administrador

create table galeria_imagens(
idImagem serial primary key,
idUsuario int,
titulo varchar(100),
caminho_imagem text
);

create table post(
idPost serial,
titulo varchar(100),
texto varchar(10000),
dataHoraPublicacao timestamp,
FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
FOREIGN KEY (idImagem) REFERENCES galeria_imagens(idImagem) ON DELETE CASCADE
);

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

drop table blog