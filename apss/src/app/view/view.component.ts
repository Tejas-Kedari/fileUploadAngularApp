import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  url = 'http://localhost:3000/';

  datas:any = [];

  constructor(private _http: HttpClient){}

  ngOnInit(): void {
      this._http.get(`${this.url}getData/`).subscribe(data => {this.datas = data; console.log(this.datas)});
  }

}
