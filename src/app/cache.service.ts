import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

const MILLISECONDS_CACHING = environment.minutesCaching * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class CacheService {

    constructor() { }

    addInCache<T>(url: string, value: T) {
        const timestamp: number = new Date().getTime();
        localStorage.setItem(url, JSON.stringify({ time: timestamp, response: value }))
    }

    getFromCache<T>(url: string): T {
        const httpCall: { time: number, response: T } = JSON.parse(localStorage.getItem(url));
        const timestamp: number = new Date().getTime();
        if (httpCall?.time && ((httpCall.time + MILLISECONDS_CACHING) >= timestamp)) {
            return httpCall.response;
        }
        return;
    }
}