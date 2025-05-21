// netlify/functions/lastfm-proxy.js
const fetch = require('node-fetch'); 

exports.handler = async function(event, context) {
    // Nome da variável de ambiente no Netlify (será configurada na UI do Netlify)
    const LASTFM_API_KEY_FROM_ENV = process.env.LASTFM_API_KEY_SECRET; 

    if (!LASTFM_API_KEY_FROM_ENV) {
        console.error("ERRO FATAL: API Key da Last.fm (LASTFM_API_KEY_SECRET) não está configurada nas variáveis de ambiente do Netlify!");
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erro de configuração do servidor: Chave da API em falta." }),
        };
    }

    const method = event.queryStringParameters.method;
    const artist = event.queryStringParameters.artist;
    const limit = event.queryStringParameters.limit || '3';

    if (!method) {
        return { statusCode: 400, body: JSON.stringify({ error: "Parâmetro 'method' é obrigatório." }) };
    }
    if (!artist && (method === 'artist.getinfo' || method === 'artist.getsimilar' || method === 'artist.gettoptracks')) {
         return { statusCode: 400, body: JSON.stringify({ error: "Parâmetro 'artist' é obrigatório para este método." }) };
    }

    let apiUrl = `https://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${LASTFM_API_KEY_FROM_ENV}&format=json&autocorrect=1`;

    if (artist) {
        apiUrl += `&artist=${encodeURIComponent(artist)}`;
    }
    if (method === 'artist.getsimilar' || method === 'artist.gettoptracks') {
        apiUrl += `&limit=${limit}`;
    }

    console.log(`[lastfm-proxy] Chamando: ${method} para artista: ${artist || 'N/A'}`);

    try {
        const lastfmResponse = await fetch(apiUrl);
        const responseText = await lastfmResponse.text(); // Lê como texto primeiro para depuração

        let data;
        try {
            data = JSON.parse(responseText); // Tenta parsear como JSON
        } catch (parseError) {
            console.error("[lastfm-proxy] Erro ao parsear JSON da Last.fm:", parseError);
            console.error("[lastfm-proxy] Texto recebido da Last.fm:", responseText);
            return { statusCode: 502, body: JSON.stringify({ error: "Resposta inválida da API da Last.fm."}) };
        }

        if (!lastfmResponse.ok) {
            const errorMsg = data.message || `Erro da API Last.fm (Status: ${lastfmResponse.status})`;
            console.error("[lastfm-proxy] Erro da API Last.fm:", errorMsg, data);
            return { statusCode: lastfmResponse.status, body: JSON.stringify({ error: errorMsg, details: data }) };
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("[lastfm-proxy] Erro geral na função:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Erro interno no proxy ao contactar a Last.fm.", details: error.message }),
        };
    }
};
