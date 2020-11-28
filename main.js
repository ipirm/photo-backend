const app = new Vue({
    el: '#app',
    data: {
        title: 'Nestjs Websockets Chat',
        name: '',
        text: '',
        messages: [],
        socket: null
    },
    methods: {
        sendMessage() {
            const message = {
                name: this.name,
                text: this.text
            }
            this.socket.emit('msgToServer', message)
            this.text = ''

        },
        receivedMessage(message) {
            this.messages.push(message)
        },
        validateInput() {
            return this.name.length > 0 && this.text.length > 0
        },
        deleteLike() {
            const data = {
                userId: 2,
                concertId: 1
            }
            this.socket.emit('deleteLike', data)
        },

        addLike(){
            const data = {
                userId: 2,
                concertId: 1
            }
            this.socket.emit('addLike',data)
        }
    },
    created() {
        this.socket = io('http://localhost:3000/like')
        this.socket.on('msgToClient', (message) => {
            this.receivedMessage(message)
        })
    }
})