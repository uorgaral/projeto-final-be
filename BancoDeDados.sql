create table usuarios(
idUsuario serial primary key,
nome varchar(100) not null,
email varchar(100) unique not null,
senha varchar(8) not null,
RA int not null
)

create table galeria_imagens(
idImagem serial,
idUsuario int,
titulo varchar(100),
caminho_imagem text,
FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE
)

create table blog(
idPosts serial,
titulo varchar(100),
conteudo varchar(10000),
dataHoraPublicacao timestamp,
idUsuario int,
FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE
)

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

INSERT INTO usuarios(nome, email, senha, RA)
VALUES ('Lara', 'uorgaral@gmail.com', 12345678, 3246);
select * from usuarios -- deu certo

INSERT INTO galeria_imagens(titulo, caminho_imagem, idUsuario)
VALUES ('teste', 'https://i.pinimg.com/736x/f1/9b/b1/f19bb155ae63f6e551cae96b71f96f0b.jpg', 1)
select * from galeria_imagens -- deu certo

INSERT INTO blog(titulo, conteudo, dataPublicacao, idUsuario)
VALUES ('teste', 'Oii pessoal, primeiro post aqui!', '07/08/2025', 1) 
select * from posts --deu certo

INSERT INTO eventos(nome, dataInicio, dataFinal, descricao, endereco, idUsuario)
VALUES ('teste', '07/08/2025', '08/08/2025', 'Arrecadação de reciclagem!', 'Rua tal, numero tal, bairro tal', 1) 
select * from eventos --deu certo

drop table blog
