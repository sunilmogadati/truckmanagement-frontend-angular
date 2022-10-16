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

  constructor(
    id: number,
    make: string,
    model: string,
    year: number,
    weight: string,
    volume: string,
    mpg: number,
    space: string,
    type: string
  ) {
    this.id = id
    this.make = make
    this.model = model
    this.year = year
    this.weight = weight
    this.volume = volume
    this.mpg = mpg
    this.space = space
    this.type = type
  }
}
