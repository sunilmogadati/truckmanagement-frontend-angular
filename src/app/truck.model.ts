import { Route } from './route.model';
export class Truck {
  id: number;
  make: string;
  model: string;
  year: number;
  weight: string;
  volume: string;
  mpg: number;
  space: string;
  type: string;
  img: string;
  truckID: number;
  routes: Route[];

  constructor(
    id: number,
    make: string,
    model: string,
    year: number,
    weight: string,
    volume: string,
    mpg: number,
    space: string,
    type: string,
    img: string,
    truckID: number,
    routes: Route[]
  ) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.volume = volume;
    this.mpg = mpg;
    this.space = space;
    this.type = type;
    this.img = img;
    this.truckID = truckID;
    this.routes = routes;
  }
}
