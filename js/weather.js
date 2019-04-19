'use strict';
import { Constants } from "./constants.js";

export class Weather {

    async showWeather() {
        try{
            // We use async/await or can use chain of promises
            const ip = await this.getIp();
            const weatherData = await this.getWeather(ip);
            await this.setData(weatherData);
        } catch (e) {
            console.log(`Can't show a weather`);
            throw e;
        }
    }

    async getIp() {
        try {
            return await getData('ip');
        } catch (e) {
            console.log(`Can't load a coordinates`);
            throw e;
        }
    };

    async getWeather(ip) {
        try {
            return await getData(`weather/${ip.latitude},${ip.longitude}`);
        } catch (e) {
            console.log(`Can't load a weather`);
            throw e;
        }
    };

    async setData(weatherData) {

        const icon = document.querySelector('#image');
        icon.src = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

        // It's not safety to use innerHtml will use textContent
        const city = document.querySelector('#city');
        city.textContent = weatherData.name;

        // Not sure what measurements
        const temp = document.querySelector('#temp');
        temp.textContent = (weatherData.main.temp | 0) + temp.textContent;

        const conditions = document.querySelector('#conditions');
        conditions.textContent = weatherData.weather[0].description;
    }
}

const getData = async (address) => {
    return await (await fetch(Constants.API + address)).json();
};

