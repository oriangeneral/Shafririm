import { Component, OnInit } from 'angular2/core';
// import { ts } from './helpers/generic';

@Component({
    selector: 'app',
    // s_tyleUrls: [ ts('/app/app.less') ],
    // t_emplateUrl: ts('/app/app.html')
    styleUrls: [ './app.less' ],
    templateUrl: './app.html'
})
export class AppComponent implements OnInit {

    public ngOnInit() {
        console.log('App was bootstrapped.');
    }

}
