import { Component, OnInit } from '@angular/core';
import { TimelineItem } from '../timeline-item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  items: TimelineItem[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getTimelineItems();
  }

  getTimelineItems(): void {
    // this.dataService.getTimelineItems()
    //   .subscribe(timelineItems => this.items = timelineItems);
    this.dataService.currentTimelineSource.subscribe(data => {
      this.items = data;
      // this.dataService.changeLoadingStatus(true);
      // for (let i = 0; i < this.items.length; i++) {

      //   this.dataService.getKeywords(this.items[i].content).subscribe(data => {
      //     let result = this.dataService.parseXml(data);
      //     let keywords: any = [];
      //     for (let i = 0; i < result.result.wi.length; i++) {
      //       keywords.push({
      //         name: result.result.wi[i],
      //         tag: null
      //       });
      //     }
      //     console.log(result);
      //     this.items[i].keywords = keywords;
      //     this.dataService.changeLoadingStatus(false);
      //   });
      // }
    });
  }

}
