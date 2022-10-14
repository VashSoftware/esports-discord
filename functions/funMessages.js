module.exports = {
    funMessages: function (message) {
        switch (message.content) {
            case "hello":
                return "Hello there!";
            case "bye":
                return "Bye!";
            default:
                return "I don't understand";
        }
    }
}