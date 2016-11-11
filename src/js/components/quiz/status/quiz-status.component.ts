import IScroll from 'iscroll';
import { AfterContentInit, Component, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

import { QuizService } from 'app/services/quiz.service';

import template from './quiz-status.html';
import mainStyle from './quiz-status.css';

@Component({
  selector: 'quiz-status',
  template: template,
  styles: [
    mainStyle
  ]
})
export class QuizStatusComponent implements AfterContentInit, OnDestroy {

  @Output() public modalActions = new EventEmitter<string | MaterializeAction>();

  private _players = [];
  private _scroll = null;

  constructor(private _quizService: QuizService, private _elementRef: ElementRef) {

  }

  public ngAfterContentInit() {
    let element = this._elementRef
      .nativeElement
      .querySelector('#status');

    this._scroll = new IScroll(element, {
      deceleration: 0.005,
      mouseWheel: true,
      mouseWheelSpeed: 10,
      probeType: 2,
      tap: false
    });

    element.style.display = 'initial';
    setTimeout(() => {
      element.style.display = 'hidden';
      this._scroll.refresh();
    });
  }

  public ngOnDestroy() {
    if (this._scroll) {
      this._scroll.destroy();
      this._scroll = null;
    }
  }

  public openModal() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }

  public closeModal() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }

  public allowScrolling() {
    let html = document.querySelector('html');
    let body = document.querySelector('body');
    html.style.overflow = 'initial';
    body.style.overflow = 'initial';
  }

  public stopAllPlayers() {
    for (let p of this._players) {
      this.stopPlayback(p.player);
    }
  }

  public stopPlayback(player: HTMLAudioElement) {
    let p = this.getPlayer(player);

    p.isPlaying = false;
    player.currentTime = 0;
    player.pause();
  }

  public startPlayback(player: HTMLAudioElement) {
    let p = this.getPlayer(player);
    this.stopAllPlayers();

    p.isPlaying = true;
    player.currentTime = 0;
    player.play();
  }

  public togglePlayback(player: HTMLAudioElement) {
    if (player.ended || player.paused) {
      this.startPlayback(player);
      return;
    }

    this.stopPlayback(player);
  }

  public isAudioPlaying(player: HTMLAudioElement) {
    let p = this.getPlayer(player);

    if (p.isPlaying) {
      return true;
    }

    return false;
  }

  public getPlayer(player: HTMLAudioElement) {
    for (let p of this._players) {
      if (p.player === player) {
        return p;
      }
    }

    let entry = { player: player };
    this._players.push(entry);

    return entry;
  }

  get quizService() {
    return this._quizService;
  }

}
