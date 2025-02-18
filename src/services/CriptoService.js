import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://laboratorio3-5459.restdb.io/rest/',
    headers: {
        'x-apikey': '64a57c2b86d8c50fe6ed8fa5'
    }
});

export const getUserTransactions = async (userId) => {
    try {
        const response = await apiClient.get(`/transactions?q={"user_id": "${userId}"}`);
        return response.data;
    } catch (error) {
        console.error('Error para obtener las transacciones del usuario', error);
        throw error;
    }
};

export const createTransaction = async (transaction) => {
    try {
        const response = await apiClient.post('/transactions', transaction);
        return response.data;
    } catch (error) {
        console.error('Error al crear la transacción', error);
        throw error;
    }
};

export const getCryptoPrice = async (exchange, crypto) => {
    try {
        const response = await axios.get(`https://criptoya.com/api/${exchange}/${crypto}/ars`);
        return response.data;
    } catch (error) {
        console.error("Error para obtener el precio", error);
        throw error;
    }
};

export default apiClient;