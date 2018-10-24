import { NewsSearchService } from './../../services/news-search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector   : 'app-button',
  templateUrl: './button.component.html',
  styleUrls  : ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  constructor(public newsSearchService: NewsSearchService) {

  }

  ngOnInit() {
  }


}
