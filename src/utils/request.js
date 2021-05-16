const request = require('superagent');
const HttpAgent = require('agentkeepalive');
const HttpsAgent = require('agentkeepalive').HttpsAgent;

const options = {
    maxSockets: 512,
    maxFreeSockets: 512,
    timeout: 60 * 1000, // active socket keepalive for 60 seconds
    freeSocketTimeout: 30 * 1000, // free socket keepalive for 30 seconds
};

const keepAliveHttpAgent = new HttpAgent(options);
const keepAliveHttpsAgent = new HttpsAgent(options);

class Request {

    post(url) {
        return request.post(url).agent(this.getAgent(url));
    }

    get(url) {
        return request.get(url).agent(this.getAgent(url));
    }

    patch(url) {
        return request.patch(url).agent(this.getAgent(url));
    }

    put(url) {
        return request.put(url).agent(this.getAgent(url));
    }

    delete(url) {
        return request.delete(url).agent(this.getAgent(url));
    }

    getAgent(url) {
        if (url.indexOf('https') >= 0) {
            return keepAliveHttpsAgent;
        }
        return keepAliveHttpAgent;
    }

    agent() {
        return {
            httpAgent: keepAliveHttpAgent,
            httpsAgent: keepAliveHttpsAgent
        };
    }

    superagent() {
        return request;
    }
}

module.exports = new Request();
