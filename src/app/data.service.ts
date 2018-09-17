import { Injectable } from '@angular/core';
import { TimelineItem } from './timeline-item';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { TIMELINEITEM } from './mock-timeline';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private nerUrl = 'localhost/nlp-tagger-php/get-keywords.php';

  private timelineItemSource = new BehaviorSubject<TimelineItem>(JSON.parse(localStorage.getItem('currentItem')));
  public currentTimelineItemSource = this.timelineItemSource.asObservable();

  private timelineSource = new BehaviorSubject<TimelineItem[]>(JSON.parse(localStorage.getItem('currentTimeline')));
  public currentTimelineSource = this.timelineSource.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  public changeTimelineItem(timelineItem: TimelineItem): void {
    localStorage.setItem('currentItem', JSON.stringify(timelineItem));
    this.timelineItemSource.next(timelineItem);
  }

  public changeTimeline(timeline: TimelineItem[]): void {
    localStorage.setItem('currentTimeline', JSON.stringify(timeline));
    this.timelineSource.next(timeline);
  }

  public getTimelineItems(): TimelineItem[] {
    return TIMELINEITEM;
    // return this.http.get<TimelineItem[]>(this.heroesUrl)
    //   .pipe(
    //     tap(heroes => this.log('fetched timeline posts')),
    //     catchError(this.handleError('getTimelineItems', []))
    //   );
  }

  public getKeywords() {
    return [
      {
        name: 'Haus',
        tag: null
      },
      {
        name: 'Test',
        tag: null
      }
    ];
    // return this.http.get<TimelineItem[]>('') // URL zu Localhost PHP Script
    //   .pipe(
    //     tap(heroes => this.log('fetched heroes')),
    //     catchError(this.handleError('getHeroes', []))
    //   );
  }

  public

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