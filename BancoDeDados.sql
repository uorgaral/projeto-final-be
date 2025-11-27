create table usuarios(
idUsuario serial primary key,
nome varchar(100) not null,
email varchar(100) unique not null,
senha varchar(255) not null
);
-- só pode incluir um novo usuário quem tiver a senha de administrador

create table post(
idPost serial primary key,
idUsuario int,
titulo varchar(100),
dataPublic TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Esta é a linha principal,
conteudo text,
confere_imagem BOOLEAN DEFAULT FALSE,
FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE
);

create table imagem (
idImagem serial primary key,
idPost int NOT NULL,
titulo varchar(100),
caminho_imagem text NOT NULL,
FOREIGN KEY (idPost) REFERENCES post(idPost) ON DELETE CASCADE
);



