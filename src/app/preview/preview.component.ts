import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { TimelineItem } from '../timeline-item';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  item: TimelineItem;
  timeline: TimelineItem[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.currentTimelineItemSource.subscribe(
      item => {
        this.item = item;
      }
    );

    this.dataService.currentTimelineSource.subscribe(
      timeline => {
        this.timeline = timeline
      }
    )
  }

  public hightlightTag(keyword: any) {
    for (let i = 0; i < this.timeline.length; i++) {
      for (let j = 0; j < this.timeline[i].keywords.length; j++) {
        if (this.timeline[i].keywords[j].name === keyword.name) {
          this.timeline[i].keywords[j].active = true;
        }
        else {
          this.timeline[i].keywords[j].active = false;
        }
      }
    }
  }

}
