import { Component, OnInit, Input } from '@angular/core';
import { TimelineItem } from '../timeline-item';
import { DataService } from '../data.service';
import { TagDialogComponent } from '../tag-dialog/tag-dialog.component';
import { MatDialog } from '@angular/material';
import { empty } from 'rxjs';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.css']
})
export class TimelineItemComponent implements OnInit {
  @Input() item: TimelineItem;

  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    console.log(this.item);
  }

  showDocument() {
    this.dataService.changeTimelineItem(this.item);
  }

  openTagDialog(keyword: any): void {
    const dialogRef = this.dialog.open(TagDialogComponent, {
      width: '250px',
      disableClose: true,
      data: {
        name: keyword.name,
        tag: keyword.tag
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) {
        keyword.tag = result;
      }
    });
  }
}
