import { Component, Output, EventEmitter } from '@angular/core';
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
export class QuizStatusComponent {

  @Output() public modalActions = new EventEmitter<string | MaterializeAction>();

  private _players = [];

  constructor(private _quizService: QuizService) {

  }

  public openModal() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }

  public closeModal() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }

  public allowScrolling() {
    let html = document.querySelector('html');
    html.style.overflow = 'initial';
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
