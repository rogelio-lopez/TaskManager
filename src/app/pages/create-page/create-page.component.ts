import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {

  @Input() title: string;
  @Output() exit = new EventEmitter();
  @Output() add = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  exitWindow(){
    this.exit.emit();
  }

  inputCreated(input: string){
    this.add.emit(input)
  }

}
