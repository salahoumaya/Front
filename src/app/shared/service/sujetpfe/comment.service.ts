import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import  {Comment} from "../../../models/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://localhost:8076/api/comments';

  constructor(private http: HttpClient) {
  }

  getComments(internshipId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/getAll/${internshipId}`);
  }

  postComment(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }
  searchComments(keyword: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/search?keyword=${keyword}`);
  }

 

  
}
