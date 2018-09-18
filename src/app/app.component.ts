import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { TimelineItem } from './timeline-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Semantic Timeline - Mandant 142 Mietzinsklage';
  loading: boolean = false;
  timeline: TimelineItem[] = null;
  fileToUpload: any;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.currentLoadingStatus.subscribe(loading => {
      this.loading = loading;
    });

    this.dataService.currentTimelineSource.subscribe(timeline => {
      this.timeline = timeline;
    })
  }

  upload() {
    this.dataService.getTimelineItems('assets/' + this.fileToUpload.name).subscribe(data => {
      this.dataService.changeTimeline(data);
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}
