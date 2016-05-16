import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PlaylistService } from './playlist.service';
import { QuestionsComponent } from '../components/questions/questions.component';

@Injectable()
export class QuizService {

  private _questionsComponent: QuestionsComponent;
  private _totalQuestions = 0;

  constructor(private playlistService: PlaylistService) {
    this.playlistService.getPlaylist().subscribe(
      playlist => this._totalQuestions = 5,
      error => console.error(error)
      );
  }

  get totalQuestions(): number {
    return this._totalQuestions;
  }

  get questionsComponent(): QuestionsComponent {
    return this._questionsComponent;
  }

  set questionsComponent(questionsComponent: QuestionsComponent) {
    this._questionsComponent = questionsComponent;
  }

}
