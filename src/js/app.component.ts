import { Component, OnInit } from 'angular2/core';
import { ts } from './helpers/generic';

@Component({
    selector: 'app',
    styleUrls: [ ts('/app/app.less') ],
    templateUrl: ts('/app/app.html')
})
export class AppComponent implements OnInit {

    public ngOnInit() {
        console.log('App was bootstrapped.');
    }

}
