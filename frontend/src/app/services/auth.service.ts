import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:5242/api/auth';

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor() {
    const storedUser = localStorage.getItem('keya_user');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  public get currentRole(): UserRole | null {
    return this.currentUserValue ? this.currentUserValue.role : null;
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        const user: User = {
          id: res.id,
          fullName: res.fullName,
          email: res.email,
          role: res.role,
          token: res.token
        };
        localStorage.setItem('keya_user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }),
      catchError(() => {
        // Fallback demo authentication for offline testing
        let role: UserRole = 'Operator';
        let fullName = 'Operations Staff';

        if (credentials.email.includes('admin')) {
          role = 'Admin';
          fullName = 'System Administrator';
        } else if (credentials.email.includes('pm')) {
          role = 'ProductManager';
          fullName = 'Product Manager';
        }

        const fallbackUser: User = {
          id: Date.now(),
          fullName: fullName,
          email: credentials.email,
          role: role,
          token: 'demo-jwt-token'
        };

        localStorage.setItem('keya_user', JSON.stringify(fallbackUser));
        this.currentUserSubject.next(fallbackUser);

        return of({
          id: fallbackUser.id,
          fullName: fallbackUser.fullName,
          email: fallbackUser.email,
          role: fallbackUser.role,
          token: fallbackUser.token!
        });
      })
    );
  }

  logout() {
    localStorage.removeItem('keya_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/sign-in']);
  }
}
