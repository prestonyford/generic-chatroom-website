export class AuthState {
    static Unknown = new AuthState('unknown');
    static Authenticated = new AuthState('authenticated');
    static Unauthenticated = new AuthState('unauthenticated');

    static async check_authentication() {
        const response = await fetch('/api/check-login-cookie');
        return response.ok;
    }
  
    constructor(name) {
        this.name = name;
    }
}