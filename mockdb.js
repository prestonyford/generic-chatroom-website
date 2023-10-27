class Database extends EventTarget {
    constructor() {
        super();    
        this.history = [];
    }

    // Placeholder function
    respond() {
        let min_respond_time = 400;
        let max_respond_time = 1400;
        setTimeout(() => {
            const new_message = {
                author: "Ki-Adi-Mundi",
                content: "What about the droid attack on the Wookiees?"
            };
            this.dispatchNewMessageEvent(new_message);
        }, Math.random() * (max_respond_time - min_respond_time) + min_respond_time)
    }

    push_message(message) {
        this.history.push(message);
        this.respond();
    }  
    dispatchNewMessageEvent(data) {
        const new_message = new CustomEvent('new_message', { detail: data });
        this.dispatchEvent(new_message);
    }
}