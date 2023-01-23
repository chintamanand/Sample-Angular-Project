import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-three-component',
  templateUrl: './three-component.component.html',
  styleUrls: ['./three-component.component.css'],
})
export class ThreeComponentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  // Receive the data from parent
  @Input('myInputMessage') myInputMessage: string = '';
  
 //Send the data to parent component
  @Output() outPut: EventEmitter<String> = new EventEmitter();
  counter: number=0;
  
  buttonClicked(): void{
    this.counter= this.counter+1;
   console.log("User Clicked");
   this.outPut.emit("User Clicked" + this.counter);
  }
}
