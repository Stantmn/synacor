import { Weather } from './weather.js';

describe('Weather', () => {
    let weather, ip, weatherData;

    beforeEach(() => {
        weather = new Weather();
    });

    describe('Getting coordinates using IP address', () => {

        it('Send async request to API',async () => {
            ip = await weather.getIp();
        });

        it('Is an object',() => {
            expect(typeof ip === 'object').to.be.true;
        });

        it('Coordinates has a property latitude',() => {
            expect(ip).to.have.property('latitude');
        });

        it('Coordinates has a property longitude',() => {
            expect(ip).to.have.property('longitude');
        });

        it('Latitude is a number',() => {
            expect(ip.longitude).to.be.a('number');
        });

        it('Longitude is a number',() => {
            expect(ip.longitude).to.be.a('number');
        });

        it('Latitude is between -180 and 180',() => {
            expect(ip.longitude >= -180 && ip.longitude <= 180).to.be.true;
        });

        it('Longitude is between -180 and 180',() => {
            expect(ip.longitude >= -180 && ip.longitude <= 180).to.be.true;
        });

    });

    describe('Getting a Weather data', () => {
        it('Send async request to API',  async () => {
            weatherData = await weather.getWeather({latitude: ip.latitude, longitude: ip.longitude});
        });

        it('Is an object',() => {
            expect(typeof weatherData === 'object').to.be.true;
        });

        it('Weather has a city and property name',() => {
            expect(weatherData).to.have.property('name');
        });

        it('City is a string',() => {
            expect(weatherData.name).to.be.a('string');
        });

        it('Weather has an icon',() => {
            expect(weatherData.weather[0]).to.have.property('icon');
        });

        it('Icon is a string',() => {
            expect(weatherData.weather[0].icon).to.be.a('string');
        });

        it('Weather has a property temperature',() => {
            expect(weatherData.main).to.have.property('temp');
        });

        it('Temperature is a number',() => {
            expect(weatherData.main.temp).to.be.a('number');
        });

        it('Temperature more than 0 (Absolute zero is the lowest limit of the thermodynamic temperature scale, a state at which the enthalpy and entropy of a cooled ideal gas reach their minimum value, taken as 0.) and less than 500 or all we die',() => {
            expect(weatherData.main.temp > 0 && weatherData.main.temp <= 500).to.be.true;
        });

        it('Weather has a property description',() => {
            expect(weatherData.weather[0]).to.have.property('description');
        });

        it('Description is a string',() => {
            expect(weatherData.weather[0].description).to.be.a('string');
        });
    });

});
