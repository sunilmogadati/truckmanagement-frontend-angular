export class Route {
  destination: string;
  endDate: string;
  routeID: number;
  source: string;
  startDate: string;
  status: string;

  constructor (
  destination: string,
  endDate: string,
  routeID: number,
  source: string,
  startDate: string,
  status: string
  ) {
    this.destination = destination
    this.endDate = endDate
    this.routeID = routeID
    this.source = source
    this.startDate = startDate
    this.status = status
  }
}
