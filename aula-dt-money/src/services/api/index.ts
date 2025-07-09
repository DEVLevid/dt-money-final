import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3333',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response){
            const { status, data } = error.response;
            if (status === 401) {
                console.error('Acesso não autorizado - verifique suas credenciais.');
            } else if (status === 404) {
                console.error('Recurso não encontrado - verifique a URL solicitada.');
            } else if (status === 500) {
                console.error('Erro Interno do Servidor - tente novamente mais tarde.');
            } else if (status === 400) {
                console.error(`Status: ${status} - ${data.message || 'Requisição inválida'}`);
            }
            else {
                console.error(`Error: ${data.message || 'Um erro de rede ou servidor indisponível'}`);
            }
        }
    }
)