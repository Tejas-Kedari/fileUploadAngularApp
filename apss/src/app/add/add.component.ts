import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  uploadForm: FormGroup;
  photo: any;
  bankStatement: any;
  adhar: any;
  signature: any;

  constructor(private _http: HttpClient) {
    this.uploadForm = new FormGroup({
      name: new FormControl(
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(38)
        ],
      ),
      mobile: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ],
      ),
      mail: new FormControl(
        "",
        [
          Validators.required,
          Validators.email
        ],
      ),
      panNo: new FormControl(
        "",
        [
          Validators.required,
        ],
      ),
      motherName: new FormControl(
        "",
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(2)
        ],
      ),
      fatherName: new FormControl(
        "",
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(2)
        ],
      ),
    });
  }

  onPhotoChanged(event: any) {
    this.photo = event.target.files[0];
  }

  onBankStatementChanged(event: any) {
    this.bankStatement = event.target.files[0];
  }

  onSignChanged(event: any) {
    this.signature = event.target.files[0];
  }

  onAdharChanged(event: any) {
    this.adhar = event.target.files[0];
  }

  ngOnInit(): void {
  }

  baseURL = 'http://localhost:3000/';

  dataUpload() {
    const formData = new FormData();
    formData.append('photo', this.photo);
    formData.append('adhar', this.adhar);
    formData.append('bankStatement', this.bankStatement);
    formData.append('signature', this.signature);
    formData.append('name', this.uploadForm.value.name);
    formData.append('mobile', this.uploadForm.value.mobile);
    formData.append('mail', this.uploadForm.value.mail);
    formData.append('panNo', this.uploadForm.value.panNo);
    formData.append('motherName', this.uploadForm.value.motherName);
    formData.append('fatherName', this.uploadForm.value.fatherName);
    this._http.post(`${this.baseURL}upload`, formData).subscribe(data => console.log(data))
  }

}
