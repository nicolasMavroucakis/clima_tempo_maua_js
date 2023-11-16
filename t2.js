const axios = require('axios');
const apiKey = 'ef0b0973b783e0614ac87612ec04344b';

// Função para obter as coordenadas da cidade
async function getCoordinates(cityName) {
try {
const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}&lang=pt_br&units=metric`);
console.log(response)
const { lat, lon } = response.data[0];
return { lat, lon };
} catch (error) {
console.error('Erro ao obter coordenadas:', error.message);
}
}

// Função para obter as condições atuais com base nas coordenadas
async function getCurrentConditions(lat, lon) {
try {
const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt_br&units=metric`);
const { feels_like, weather } = response.data.main;
const description = response.data.weather[0].description;
console.log(`Sensação térmica: ${feels_like}°C`);
console.log(`Descrição: ${description}`);
} catch (error) {
console.error('Erro ao obter condições atuais:', error.message);
}
}

// Exemplo de uso
async function main() {
const cityName = 'Itu'; // Substitua pelo nome da cidade desejada
const coordinates = await getCoordinates(cityName);

if (coordinates) {
const { lat, lon } = coordinates;
await getCurrentConditions(lat, lon);
}
}

main();