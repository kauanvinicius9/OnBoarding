import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    role: string;
    username: string;
}

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = "/api/auth";

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                if (response.token) {
                    localStorage.setItem("auth_token", response.token);
                    localStorage.setItem("user_role", response.role);
                    localStorage.setItem("username", response.username);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem("auth_token");
    }

    getRole(): string | null {
        return localStorage.getItem("user_role");
    }

    isAdmin(): boolean {
        return this.getRole() === "ADMIN";
    }
}