export class AuthState {
    static Unknown = new AuthState('unknown');
    static Authenticated = new AuthState('authenticated');
    static Unauthenticated = new AuthState('unauthenticated');

    static async check_authentication() {
        return (await fetch('/api/check-login-cookie')).ok;
    }
  
    constructor(name) {
        this.name = name;
    }
}