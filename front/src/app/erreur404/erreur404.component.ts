import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-erreur404',
  templateUrl: './erreur404.component.html',
  styleUrls: ['./erreur404.component.css']
})
export class Erreur404Component implements OnInit {

  path: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.pipe(take(1))
      .subscribe((data: { path: string }) => {
        this.path = data.path;
      });
  }
}
