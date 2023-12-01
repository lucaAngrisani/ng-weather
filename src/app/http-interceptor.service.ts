import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { CacheService } from "./cache.service";

@Injectable()
export class HttpInterceptorService {

  constructor(
    private cacheService: CacheService,
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    //BECAUSE ON INSTRUCTIONS IT IS WRITTEN "using the browser’s storage"
    const httpResponse = this.cacheService.getFromCache(request.url);
    if (httpResponse) {
      return of(new HttpResponse(httpResponse));
    }

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.cacheService.addInCache(request.url, event)
        }
      }),
      catchError((error: HttpErrorResponse) => {
        throw Error(error.message);
      }),
    );
  }
}