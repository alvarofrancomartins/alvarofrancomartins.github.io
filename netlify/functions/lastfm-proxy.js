// netlify/functions/lastfm-proxy.js (VERSÃO DE TESTE SIMPLES)
exports.handler = async function(event, context) {
    console.log("Função lastfm-proxy (versão de teste simples) chamada!");
    const method = event.queryStringParameters.method || "nenhum método";
    const artist = event.queryStringParameters.artist || "nenhum artista";

    return {
        statusCode: 200,
        headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ 
            message: `Função de teste executada com sucesso! Método: ${method}, Artista: ${artist}`,
            timestamp: new Date().toISOString()
        }),
    };
};