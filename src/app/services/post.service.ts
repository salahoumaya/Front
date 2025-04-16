import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from "../models/post";
import {ReactionType} from "../models/reaction";

class ReactionDto {
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8076/api/posts';

  constructor(private http: HttpClient) {
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const token = this.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl, {headers: this.getHeaders()});
  }

  createPost(post: Post, userId: number): Observable<Post> {
    return this.http.post<Post>(this.apiUrl + `?userId=${userId}`, post, {
      responseType: 'text' as 'json',
      headers: this.getHeaders()
    });
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/${postId}`, {headers: this.getHeaders()});
  }

  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(this.apiUrl + `/${postId}`, {headers: this.getHeaders()});
  }

  addCommentToPost(postId: number, userId: number, comment: { content: string }): Observable<Comment> {
    return this.http.post<Comment>(
      `http://localhost:8076/api/comments?userId=${userId}&postId=${postId}`,
      comment,
      {headers: this.getHeaders()}
    );
  }

  reactToPost(userId: number, postId: number, reaction: ReactionDto): Observable<Post> {
    return this.http.post<Post>(`http://localhost:8076/api/reactions/post?userId=${userId}&postId=${postId}`, reaction, {headers: this.getHeaders()});
  }

  reactToComment(userId: number, commentId: number, reaction: ReactionDto) {
    return this.http.post(`http://localhost:8076/api/reactions/comment?userId=${userId}&commentId=${commentId}`, reaction, {headers: this.getHeaders()});
  }

  // reaction.service.ts
  getPostReactions(postId: number) {
    return this.http.get<{ [key in ReactionType]?: number }>(
      `http://localhost:8076/api/reactions/post-reactions?postId=${postId}`, {headers: this.getHeaders()}
    );
  }

  getCommentReactions(commentId: number) {
    return this.http.get<{ [key in ReactionType]?: number }>(
      `http://localhost:8076/api/reactions/comment-reactions?commentId=${commentId}`, {headers: this.getHeaders()}
    );
  }

  getCommentReactionsWithUsers(commentId: number) {
    return this.http.get<{ name: string, type: string }[]>(
      `http://localhost:8076/api/reactions/comment-users?commentId=${commentId}`, {headers: this.getHeaders()}
    );
  }

  getPostReactionsWithUsers(postId: number) {
    return this.http.get<{ name: string, type: string }[]>(
      `http://localhost:8076/api/reactions/post-users?postId=${postId}`, {headers: this.getHeaders()}
    );
  }
}
