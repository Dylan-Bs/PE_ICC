import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.component.html',
  styleUrls: ['./rgpd.component.css']
})
export class RgpdComponent implements OnInit {

  content: any;

  constructor(private httpClient: HttpClient, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.httpClient.get("assets/data/rgpd.txt", {responseType: 'text'}).subscribe(data => {
      this.content = this.sanitizer.bypassSecurityTrustHtml(data);
    })
  }
}
