import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UploadMediaService {

    constructor(private http: HttpClient) {
    }

    baseUrl = "http://localhost:8080/users/1/media";

    upload(file: File) {
        this.http.post(this.baseUrl, file, {
            reportProgress: true,
            observe: 'events'
        })
            .subscribe(event => {
                console.log(event); // handle event here
            });
    }
}
