// netlify/functions/lastfm-proxy.js
const fetch = require('node-fetch'); // Para fazer requisições HTTP

exports.handler = async function(event, context) {
    // A sua API Key da Last.fm será lida das variáveis de ambiente do Netlify
    const LASTFM_API_KEY = process.env.REACT_APP_LASTFM_API_KEY; // Nome da variável de ambiente

    if (!LASTFM_API_KEY) {
        console.error("API Key da Last.fm não configurada nas variáveis de ambiente.");
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Configuração do servidor incompleta." }),
        };
    }

    // Parâmetros esperados da query string da chamada do frontend
    const method = event.queryStringParameters.method;
    const artist = event.queryStringParameters.artist;
    const limit = event.queryStringParameters.limit || '3'; // Limite padrão se não especificado

    // Validação básica dos parâmetros
    if (!method) {
        return { statusCode: 400, body: JSON.stringify({ error: "Parâmetro 'method' é obrigatório." }) };
    }
    if (!artist && (method === 'artist.getinfo' || method === 'artist.getsimilar' || method === 'artist.gettoptracks')) {
         return { statusCode: 400, body: JSON.stringify({ error: "Parâmetro 'artist' é obrigatório para este método." }) };
    }


    let apiUrl = `https://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${LASTFM_API_KEY}&format=json&autocorrect=1`;

    if (artist) {
        apiUrl += `&artist=${encodeURIComponent(artist)}`;
    }
    if (method === 'artist.getsimilar' || method === 'artist.gettoptracks') {
        apiUrl += `&limit=${limit}`;
    }

    // console.log("Proxy chamando URL:", apiUrl); // Para depuração

    try {
        const lastfmResponse = await fetch(apiUrl);
        const data = await lastfmResponse.json();

        if (!lastfmResponse.ok) {
            // Tenta repassar a mensagem de erro da Last.fm se disponível
            const errorMsg = data.message || `Erro da API Last.fm: Status ${lastfmResponse.status}`;
            console.error("Erro da API Last.fm:", errorMsg, data);
            return {
                statusCode: lastfmResponse.status,
                body: JSON.stringify({ error: errorMsg, details: data }),
            };
        }

        return {
            statusCode: 200,
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Permite chamadas de qualquer origem (ajuste se necessário)
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Erro na função proxy ao chamar Last.fm:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erro interno ao contactar o serviço da Last.fm.", details: error.message }),
        };
    }
};
