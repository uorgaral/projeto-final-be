const conexao = require('../conexao');
const bcrypt = require('bcrypt');


// publicModel.js

const selecionarTodosPost = async () => {
    const query = `
        SELECT
            p.idpost,
            p.idusuario,
            p.titulo,
            p.datapublic,
            p.conteudo,
            p.confere_imagem,
            (
                -- Subconsulta para pegar o caminho da primeira imagem (ordenada por idimagem)
                SELECT i.caminho_imagem
                FROM imagem i
                WHERE i.idpost = p.idpost
                ORDER BY i.idimagem 
                LIMIT 1
            ) AS caminho_imagem
        FROM post p
        ORDER BY p.datapublic DESC; 
    `;
    
    try {
        const { rows } = await conexao.query(query);
        return rows;
    } catch (error) {
        console.error("Erro ao selecionar todos os posts com imagem:", error);
        throw error;
    }
};

// ... o restante do seu arquivo publicModel.js

const selecionarTodosImagem = async () => {
    const query = 'SELECT * FROM imagem';
    const { rows } = await conexao.query(query);
    return rows;
};

const getPostPorId = async (idPost) => {
    const queryPost = 'SELECT titulo, dataPublic, conteudo FROM post WHERE idPost = $1';
    const queryImagem = 'SELECT caminho_imagem FROM imagem WHERE idPost = $1';
    
    
    try{
        const resultPost = await conexao.query(queryPost, [idPost]);
        if (resultPost.rows.length === 0) {
            return null; // Post not found
        }
        const post = resultPost.rows[0];

        const resultImagem = await conexao.query(queryImagem, [idPost]);
        const caminhoImagem = resultImagem.rows.map(row => row.caminho_imagem);

        return{
            ...post,
            imagem: caminhoImagem
        };
    }catch ( error ) {
    console.error("Erro ao buscar publicação por ID:", error);
    throw error;
}
} 


module.exports = {
selecionarTodosPost,
selecionarTodosImagem,
getPostPorId
};