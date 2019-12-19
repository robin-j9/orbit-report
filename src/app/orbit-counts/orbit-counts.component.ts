import { Component, OnInit, Input } from '@angular/core';
import { Satellite } from '../satellite';

@Component({
  selector: 'app-orbit-counts',
  templateUrl: './orbit-counts.component.html',
  styleUrls: ['./orbit-counts.component.css']
})
export class OrbitCountsComponent implements OnInit {

  @Input() satellites: Satellite[];

  constructor() { }

  ngOnInit() {
  }

  numberOfSatelliteType(type: string) {
    let total: number = 0;
    for (let satellite of this.satellites) {
      if (satellite.type.toLowerCase() === type.toLowerCase()) {
        total++;
      }
    }
    return total;
  }
}
