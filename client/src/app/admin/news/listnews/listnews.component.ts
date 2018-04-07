import { PolicyService } from './../../../service/policy.service';
import { Component, OnInit } from '@angular/core';
import { News } from "../../../models/news";
import { NewsService } from "../../../service/news.service";

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';


// import {News} from ''
@Component({
  selector: 'app-listnews',
  templateUrl: './listnews.component.html',
  styleUrls: ['./listnews.component.css']
})
export class ListnewsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  news : Array<News> = [];

  message;
  messageClass;
  processing = false;

  constructor(
    private newsService : NewsService
  ) { }

  newsId = '';

  deleteNews(id){
    this.newsService.deleteNews(id).subscribe(data =>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllNews();
      }
    });
  }

  getAllNews(){
    this.newsService.getTop6News().subscribe(data => {
      this.news = data.listNews;
      this.dtTrigger.next();
      console.log(data.listNews);
    });
  }

  ngOnInit() {
   
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getAllNews();
    

    // this.policyService.getAll().subscribe(data =>{
    //   console.log(data);
    // });

    
  }

}
