import {Component} from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {AuthService} from "../../../shared/service/Auth/auth.service";
import {routes} from "../../../shared/service/routes/routes";
declare var bootstrap: any;

@Component({
  selector: 'app-student-forums',
  templateUrl: './student-forums.component.html',
  styleUrl: './student-forums.component.scss'
})
export class StudentForumsComponent {
  text: string | undefined;
  posts: Post[] = [];
  filteredPosts : Post[] = [];
  postCount: any;
  userId: any;
  newPost: Post = {
    id: 0,
    title: '',
    content: '',
    createdAt: new Date(),
    category: 'GENERAL',
    author: {},
    comments: [],
    reactions: []
  };

  getUserProfile() {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.userId = response.ourUsers.id;
      },
      error: (error) => {
        console.log('❌ Erreur lors de la récupération des données utilisateur :', error);
      }
    });
  }

  constructor(private postService: PostService, private authService: AuthService) {
    this.getUserProfile();
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.postCount = data.length
        this.posts = data
        this.filterMyPosts();
      },
      (error) => console.error('Error fetching formations', error)
    );
  }

  createPost(): void {
    this.postService.createPost(this.newPost, this.userId).subscribe({
      next: (created: any) => {
        this.newPost = {
          id: 0,
          title: '',
          content: '',
          createdAt: new Date(),
          category: 'GENERAL',
          author: {},
          comments: [],
          reactions: []
        };
        this.loadPosts();
        const modalEl = document.getElementById('add-tickets');
        if (modalEl) {
          const modalInstance = bootstrap.Modal.getInstance(modalEl);
          modalInstance?.hide(); // close it
        }

      },
      error: (err: any) => console.error('Error creating post:', err)
    });
  }

  stripHtmlTags(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  filterMyPosts(): void {
    this.filteredPosts = this.posts.filter(post => post.author?.id === this.userId);
  }

  protected readonly routes = routes;

  deletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          this.posts = this.posts.filter(p => p.id !== postId);
          this.filteredPosts = this.filteredPosts.filter(p => p.id !== postId);
        },
        error: (err) => console.error('Error deleting post:', err)
      });
    }
  }

}
