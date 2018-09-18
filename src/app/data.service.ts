import { Injectable } from '@angular/core';
import { TimelineItem } from './timeline-item';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { NgxXml2jsonService } from 'ngx-xml2json';

const httpOptions = {
  //headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private nerUrl = 'http://localhost/timeline/src/assets/nlp-tagger-php/index.php';

  private timelineItemSource = new BehaviorSubject<TimelineItem>(JSON.parse(localStorage.getItem('currentItem')));
  public currentTimelineItemSource = this.timelineItemSource.asObservable();

  private timelineSource = new BehaviorSubject<TimelineItem[]>(null);
  public currentTimelineSource = this.timelineSource.asObservable();

  private loadingSource = new BehaviorSubject<boolean>(false);
  public currentLoadingStatus = this.loadingSource.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private ngxXml2jsonService: NgxXml2jsonService
  ) { }

  public changeTimelineItem(timelineItem: TimelineItem): void {
    localStorage.setItem('currentItem', JSON.stringify(timelineItem));
    this.timelineItemSource.next(timelineItem);
  }

  public changeTimeline(timeline: TimelineItem[]): void {
    this.timelineSource.next(timeline);
  }

  public changeLoadingStatus(loading: boolean): void {
    this.loadingSource.next(loading);
  }

  public getTimelineItems(url: string): Observable<TimelineItem[]> {
     return this.http.get<TimelineItem[]>(url)
       .pipe(
         tap(data => this.log('fetched data posts')),
         catchError(this.handleError('getTimelineItems', []))
       );
  }  
  
  public getKeywords(text): Observable<any> {
    let data = {
      text: text
    };
    return this.http.post(this.nerUrl, data);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}