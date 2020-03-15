export default class SwapiService {

  _apiBase = 'https://swapi.co/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
          `, received ${res.status}`)
    }
    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  }

  getPerson(id) {
    const res = this.getResource(`/people/${id}/`);
    return this._transformPerson(res);
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  }

  getStarship(id) {
    const res = this.getResource(`/starships/${id}/`);
    return this._transformStarship(res);
  }

  /*
  * Transformation between json responce and app vars
   */
  _transformPlanet(planet) {
    return {
      id: this._extractedId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  _transformStarship(starship) {
    return {
      id: this._extractedId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    }
  }

  _transformPerson(person) {
    return {
      id: this._extractedId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    }
  }

  _extractedId(planet) {
    const idRegExp = /\/([0-9]*)\/$/;
    const id = planet.url.match(idRegExp)[1];

    return id;
  }
}
