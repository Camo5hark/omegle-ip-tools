const host = 'localhost';
const port = 8032;

window.RTCPeerConnectionOriginal = window.RTCPeerConnection;
window.RTCPeerConnection = function(config) {
    const rtcPC = new window.RTCPeerConnectionOriginal(config);
    rtcPC.addIceCandidateOriginal = rtcPC.addIceCandidate;
    rtcPC.addIceCandidate = function(candidate) {
        const args = candidate.candidate.split(' ');

        if (args[7] == 'srflx') {
            const request = new XMLHttpRequest();
            request.onload = function() {
                const chatMsgBox = document.getElementsByClassName("chatmsg")[0];
                chatMsgBox.innerHTML = request.responseText;

                const sendButton = document.getElementsByClassName("sendbtn")[0];
                sendButton.click();
            }
            request.open('get', `http://${host}:${port}/${args[4]}`);
            request.send();
        }

        return rtcPC.addIceCandidateOriginal(candidate);
    }

    return rtcPC;
}