'use strict';
import {Constants} from "./constants.js";

export class Weather {

    constructor(){
        this.ip = {};
        this.weatherData = {};
    }

    async getIp() {
        // We use async/await or can use chain of promises
        try {
            this.ip = await getData('ip');
        } catch (e) {
            console.log(`Can't load coordinates`);
            throw e;
        }
    };

    async getWeather() {
        try {
            this.weatherData = await getData(`weather/${this.ip.latitude},${this.ip.longitude}`);
        } catch (e) {
            console.log(`Can't load weather`);
            throw e;
        }
    };

    async setData() {

        const icon = document.querySelector('#image');
        icon.src = `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`;

        // It's not safety to use innerHtml will use textContent
        const city = document.querySelector('#city');
        city.textContent = this.weatherData.name;

        // Not sure what measurements
        const temp = document.querySelector('#temp');
        temp.textContent = (this.weatherData.main.temp | 0) + temp.textContent;

        const conditions = document.querySelector('#conditions');
        conditions.textContent = this.weatherData.weather[0].description;
    }
}

const getData = async (address) => {
    return await (await fetch(Constants.API + address)).json();
};

