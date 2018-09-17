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

}
