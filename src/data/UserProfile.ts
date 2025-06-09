class UserProfile {
    private username: string;
    private email: string;

    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }

    public getUsername(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public setUsername(username: string): void {
        if (!username || username.trim() === '') {
            throw new Error('Username cannot be empty');
        }
        this.username = username;
    }

    public setEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        this.email = email;
    }

    public toJSON(): { username: string; email: string } {
        return {
            username: this.username,
            email: this.email,
        };
    }
}

export default UserProfile;