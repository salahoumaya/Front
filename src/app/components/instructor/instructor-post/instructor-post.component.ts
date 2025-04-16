import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { ReactionType } from 'src/app/models/reaction';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/shared/service/Auth/auth.service';
declare var bootstrap: any;
@Component({
  selector: 'app-instructor-post',
  templateUrl: './instructor-post.component.html',
  styleUrl: './instructor-post.component.scss'
})
export class InstructorPostComponent {
  postId!: number;
  post!: Post;
  userId: any;
  commentText: string = '';
  type: 'LIKE' | 'LOVE' | "WOW" | 'SAD' | 'ANGRY' | undefined; // Match your enum values
  reactedAt?: string; // Optional, backend can set this
  reactions = [
    {type: ReactionType.LIKE, emoji: '👍', label: '👍 Like'},
    {type: ReactionType.DISLIKE, emoji: '👎', label: '👎 Dislike'},
    {type: ReactionType.LOVE, emoji: '❤️', label: '❤️ Love'},
    {type: ReactionType.LAUGH, emoji: '😂', label: '😂 Laugh'},
    {type: ReactionType.SAD, emoji: '😢', label: '😢 Sad'}
  ];
  postReactions: { [key in ReactionType]?: number } = {};
  commentReactions: { [commentId: number]: { name: string, type: string }[] } = {};
  postReactionsList: { name: string, type: string }[] = [];


  constructor(private route: ActivatedRoute, private postService: PostService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUserProfile();
    this.loadPost();
  }

  getUserProfile(): void {
    this.authService.getProfile().subscribe({
      next: (res) => {
        this.userId = res.ourUsers.id;
      }
    });
  }

  loadPost(): void {
    this.postService.getPostById(this.postId).subscribe({
      next: (data) => {
        this.post = data
        this.loadPostReactionsWithUsers();
        this.post.comments.forEach((comment: { id: number; }) => this.loadCommentReactions(comment.id));
      },
      error: (err) => console.error('Error loading post details:', err)
    });
  }

  addComment(): void {
    if (!this.commentText.trim()) return;

    const comment = {content: this.commentText};
    this.postService.addCommentToPost(this.postId, this.userId, comment).subscribe({
      next: (updatedPost) => {
        this.commentText = '';
        this.loadPost();
      }
    });
  }

  reactToPost(type: string) {
    const reaction = {type};
    this.postService.reactToPost(this.userId, this.post.id, reaction).subscribe({
      next: (res) => {
        this.loadPostReactionsWithUsers();
      },
      error: (err) => console.error('Error reacting to post', err)
    });
  }

  reactToComment(commentId: number, type: string) {
    const reaction = {type};
    this.postService.reactToComment(this.userId, commentId, reaction).subscribe({
      next: (res) => {
        this.loadCommentReactions(commentId);
      },
      error: (err) => console.error('Error reacting to comment', err)
    });
  }

  loadPostReactions() {
    this.postService.getPostReactions(this.post.id).subscribe((data) => {
      this.postReactions = data;
    });
  }

  loadCommentReactions(commentId: number) {
    this.postService.getCommentReactionsWithUsers(commentId).subscribe(data => {
      this.commentReactions[commentId] = data;
    });
  }

  getEmoji(type: string): string {
    switch (type) {
      case 'LIKE':
        return '👍';
      case 'DISLIKE':
        return '👎';
      case 'LOVE':
        return '❤️';
      case 'LAUGH':
        return '😂';
      case 'SAD':
        return '😢';
      default:
        return '';
    }
  }

  loadPostReactionsWithUsers() {
    this.postService.getPostReactionsWithUsers(this.post.id).subscribe(data => {
      this.postReactionsList = data;
    });
  }
}
