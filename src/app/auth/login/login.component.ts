import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/Auth/auth.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public routes = routes;
  loginForm: FormGroup;
  errorMessage: string = '';
  loading = false;

  passwordType = 'password';
  showPassword = true;

  welcomeLogin = [
    { img: 'assets/img/register-img.png' },
    { img: 'assets/img/register-img.png' },
    { img: 'assets/img/register-img.png' }
  ];

  public welcomeLoginOwlOptions: OwlOptions = {
    margin: 25,
    nav: true,
    loop: true,
    responsive: {
      0: { items: 1 },
      768: { items: 3 },
      1170: { items: 4 }
    },
  };

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/)
        ],
      ],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
        this.errorMessage = 'Veuillez corriger les erreurs ci-dessus avant de continuer.';
        return;
    }

    this.loading = true;
    console.log('📤 Sending login request:', this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
            console.log('✅ Login Successful:', response);

            // 🔹 Vérification du token dans la réponse
            if (response.token) {
                localStorage.setItem('token', response.token);  // Stocker le token si présent
            } else {
                this.errorMessage = ' Réessayez.';
                this.loading = false;
                return;
            }

            // 🔹 Redirection selon le rôle
            switch (response.role) {
                case 'ADMIN':
                    this.router.navigate(['/instructor/instructor-dashboard']);
                    break;
                case 'MODERATOR':
                    this.router.navigate(['/pages/course/formations']);
                    break;
                default:
                    this.router.navigate(['/student/student-test']);
                    break;
            }

            alert('✅ Login réussi !');
        },
        error: (error) => {
            console.log('❌ Login Error:', error);
            if (error.status === 401) {
                this.errorMessage = 'Mot de passe incorrect. Veuillez réessayer.';
            } else if (error.status === 404) {
                this.errorMessage = 'Email non trouvé. Veuillez vérifier votre email.';
            } else if (error.status === 403) {
                this.errorMessage = 'Accès refusé. Veuillez contacter l’administrateur.';
            } else {
                this.errorMessage = error.error?.message || error.message || 'Une erreur est survenue. Réessayez.';
            }
            this.loading = false;
        },
    });
}


  togglePassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.showPassword = !this.showPassword;
  }
}
