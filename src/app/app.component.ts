import { Component } from '@angular/core';
import {SwPush, SwUpdate} from '@angular/service-worker';
import {interval} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent {

    constructor() {

    }
}
