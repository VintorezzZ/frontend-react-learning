import Book from '../data/Book';

export default class ApiService {
    static async fetchBooks() {
        const response = await fetch('http://localhost:80/index.php/getBooks', {
            credentials: 'include'
        });

        if (!response.ok) {
            console.warn(`Ошибка сети: ${response.statusText}`);
        }

        const data = await response.json();

        // преобразуем объекты данных в экземпляры Book
        const book = data.map(item => new Book(item));
        return book;
    }

    // data - массив объектов {title: string, author: string}
    static async saveBooks(data) {
        const response = await fetch('http://localhost:80/index.php/saveBooks', {
            method: 'POST',
            body: JSON.stringify({data}),
            credentials: 'include',
        });

        console.log("responce OK: ", response.ok);

        if (!response.ok) {
            console.warn(`Ошибка сети: ${response.statusText}`);
        }

        let body = await response.json();
        let payload = body['result'];
        console.log(payload);
        return payload;
    }

    // data - структура с полями {username: string, password: string}
    static async login(data) {
        //console.log('Login data:', data);
        let response = await fetch('http://localhost:80/index.php/auth/login', {
            method: 'POST',
            body: JSON.stringify({data}),
            credentials: 'include'
        });

        //console.log(response);
        console.log("responce OK: ", response.ok);

        if (!response.ok) {
            console.warn(`Ошибка авторизации: ${response.statusText}`);
        }

        let body = await response.json();
        let payload = body['result'];
        console.log(payload);
        return payload;
    }

    // data - структура с полями {username: string, password: string}
    static async register(data) {
        const response = await fetch('http://localhost:80/index.php/auth/register', {
            method: 'POST',
            body: JSON.stringify({data}),
            credentials: 'include'
        });

        console.log("responce OK: ", response.ok);

        if (!response.ok) {
            console.warn(`Ошибка регистрации: ${response.statusText}`);
        }

        let body = await response.json();
        let payload = body['result'];
        console.log(payload);
        return payload;
    }

    // data - структура с полями {username: string, password: string}
    static async checkSession() {
        const response = await fetch('http://localhost:80/index.php/auth/checkSession', {
            method: 'GET',
            credentials: 'include'
        });

        console.log("responce OK: ", response.ok);

        if (!response.ok) {
            console.warn(`Ошибка авторизации: ${response.statusText}`);
        }

        let body = await response.json();
        let payload = body['result'];
        console.log(payload);
        return payload;
    }

    // data - структура с полями {username: string, password: string}
    static async logout() {
        const response = await fetch('http://localhost:80/index.php/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });

        console.log("responce OK: ", response.ok);

        if (!response.ok) {
            console.warn(`Ошибка logout: ${response.statusText}`);
        }

        let body = await response.json();
        let payload = body['result'];
        console.log(payload);
        return payload;
    }

    // data - структура с полями {username: string, password: string}
    static async deleteAccount() {
        const response = await fetch('http://localhost:80/index.php/auth/delete', {
            method: 'POST',
            credentials: 'include'
        });

        console.log("responce OK: ", response.ok);

        if (!response.ok) {
            console.warn(`Ошибка delete: ${response.statusText}`);
        }

        let body = await response.json();
        let payload = body['result'];
        console.log(payload);
        return payload;
    }

    // data - структура с полями {username: string, password: string}
    static async updateUsername(data) {
        console.log('responce: ', JSON.stringify({data}))
        const response = await fetch('http://localhost:80/index.php/profile/updateUsername', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({data}),
        });

        console.log("responce OK: ", response.ok);

        if (!response.ok) {
            console.warn(`Ошибка update: ${response.statusText}`);
        }

        let body = await response.json();
        let payload = body['result'];
        console.log(payload);
        return payload;
    }

    // data - структура с полями {username: string, password: string}
    static async updateEmail(data) {
        const response = await fetch('http://localhost:80/index.php/profile/updateEmail', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({data}),
        });

        console.log("responce OK: ", response.ok);

        if (!response.ok) {
            console.warn(`Ошибка update: ${response.statusText}`);
        }

        let body = await response.json();
        let payload = body['result'];
        console.log(payload);
        return payload;
    }

    // data - структура с полями {username: string, password: string}
    static async getUserProfile() {
        const response = await fetch('http://localhost:80/index.php/profile/getProfile', {
            method: 'POST',
            credentials: 'include',
        });

        console.log("responce OK: ", response.ok);

        if (!response.ok) {
            console.warn(`Ошибка get profile: ${response.statusText}`);
        }

        let body = await response.json();
        let payload = body['result'];
        console.log(payload);
        return payload;
    }
}