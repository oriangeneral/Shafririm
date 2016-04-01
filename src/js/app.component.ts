import { Component, OnInit } from 'angular2/core';

@Component({
    selector: 'app',
    styleUrls: ['/app/app.less'],
    templateUrl: '/app/app.html'
})
export class AppComponent implements OnInit {

    public ngOnInit() {
        console.log('App was bootstrapped.');
    }

}
