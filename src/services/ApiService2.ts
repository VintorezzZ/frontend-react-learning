import UserProfile from "../data/UserProfile";

interface RequestOptions {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: unknown;
}

interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

async function sendRequest<T>(options: RequestOptions): Promise<ApiResponse<T>> {
    const {url, method, data} = options;

    try {
        const response = await fetch(url, {
            method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : undefined,
        });

        const responseData: T = await response.json();

        return {
            data: responseData,
            status: response.status,
            statusText: response.statusText,
        };
    } catch (error) {
        throw new Error(`Request failed: ${(error as Error).message}`);
    }
}

export default class ApiService2 {
    private static readonly baseUrl: string = 'http://localhost:80/index.php';

    // constructor(baseUrl: string) {
    //     this.baseUrl = baseUrl;
    // }

    static async request<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', data?: unknown): Promise<ApiResponse<T>> {
        const url = `${this.baseUrl}${endpoint}`;
        return await sendRequest<T>({url, method, data});
    }

    static async register(login: string, password: string, email: string, username: string): Promise<ApiResponse<string>> {
        const data = { login: login, password: password, email: email, username: username };
        return await this.request<string>('/auth/register', 'POST', data);
    }

    static async login(login: string, password: string): Promise<ApiResponse<string>> {
        const data = { login: login, password: password };
        return await this.request<string>('/auth/login', 'POST', data);
    }

    static async logout(): Promise<ApiResponse<string>> {
        return await this.request<string>('/auth/logout', 'POST');
    }

    static async checkSession(): Promise<ApiResponse<string>> {
        return await this.request<string>('/auth/checkSession', 'GET');
    }

    static async deleteAccount(): Promise<ApiResponse<string>> {
        return await this.request<string>('/auth/delete', 'POST');
    }

    static async updateUsername(username: string): Promise<ApiResponse<{ username: string }>> {
        const data = { username: username };
        return await this.request<{ username: string }>('/profile/updateUsername', 'POST', data);
    }

    static async updateEmail(email: string): Promise<ApiResponse<{ email: string }>> {
        const data = { email: email };
        return await this.request<{ email: string }>('/profile/updateEmail', 'POST', data);
    }

    static async getUserProfile(): Promise<ApiResponse<UserProfile>> {
        const response = await this.request<UserProfile>('/profile/getProfile', 'GET');
        console.log('User Profile:', response.data);
        return response;
    }
}