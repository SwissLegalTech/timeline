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
    this.items = this.dataService.getTimelineItems();
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].keywords = this.dataService.getKeywords();
    }

    this.dataService.changeTimeline(this.items);
  }

}
