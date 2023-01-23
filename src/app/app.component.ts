import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userData1: string = '';
  musicianName2: string = 'A R Rahman';

  value1_1: number = 20;
  value2_1: number = 30;
  color1: string = 'color:red;';
  isAllowed: boolean = false;
  title: string = 'Anand';
  ImgWidth = '200';
  altText: string = 'Alternate Text incase of Image not found';

  text22: string = '';

  toggleBtn(): void {
    console.log('User Clicked');
    //console.log("data is - " + event.toElement);
    if (this.isAllowed) {
      this.isAllowed = false;
    } else {
      this.isAllowed = true;
    }
  }

  triggerEvent1(counter: number): void {
    console.log('Parent Counter value from child -- ' + counter);
 }
 
 getDataFromChild(data: any): void{
   console.log("Data is received from Child --- " + data);
 }
 
}
