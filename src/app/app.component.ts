import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'orbit-report';
   sourceList: Satellite[];
   displayList: Satellite[];
   satelliteTypes: string[];

   constructor() {
      this.sourceList = [];
      this.displayList = [];
      this.satelliteTypes = [];
      let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

   window.fetch(satellitesUrl).then(function(response) {
      response.json().then(function(data) {

         let fetchedSatellites = data.satellites;
         // TODO: loop over satellites
         // TODO: create a Satellite object using new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
         // TODO: add the new Satellite object to sourceList using: this.sourceList.push(satellite);

         for (let satellite of fetchedSatellites) {
            let newSatellite = new Satellite(satellite.name, satellite.type, satellite.launchDate, satellite.orbitType, satellite.operational);
            this.sourceList.push(newSatellite);
         }
         this.displayList = this.sourceList.slice(0);

         for (let satellite of this.sourceList) {
            if (!this.satelliteTypes.includes(satellite.type)) {
               this.satelliteTypes.push(satellite.type);
            }
         }
      }.bind(this));
   }.bind(this));

   }

   search(searchTerm: string): void {
      let matchingSatellites: Satellite[] = [];
      searchTerm = searchTerm.toLowerCase();
      for(let i=0; i < this.sourceList.length; i++) {
         let type = this.sourceList[i].type.toLowerCase();
         let orbitType = this.sourceList[i].orbitType.toLowerCase();
         let name = this.sourceList[i].name.toLowerCase();
         
         if (type.indexOf(searchTerm) >= 0 || 
            orbitType.indexOf(searchTerm) >= 0 ||
            name.indexOf(searchTerm) >= 0) {
            matchingSatellites.push(this.sourceList[i]);
         }
      }
      // assign this.displayList to be the the array of matching satellites
      // this will cause Angular to re-make the table, but now only containing matches
      this.displayList = matchingSatellites;
   }
}
