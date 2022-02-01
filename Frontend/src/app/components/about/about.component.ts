import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title: String;
  public subTitle: String;
  public email: String;

  constructor() { 
    this.title = "Jose Casal";
    this.subTitle = "Ingeniero en software";
    this.email = "jose.casal203970@potros.itson.edu.mx";
  }

  ngOnInit(): void {
  }

}
