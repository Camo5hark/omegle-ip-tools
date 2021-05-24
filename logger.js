window.RTCPeerConnectionOriginal = window.RTCPeerConnection;
window.RTCPeerConnection = function(config) {
    const rtcPC = new window.RTCPeerConnectionOriginal(config);
    rtcPC.addIceCandidateOriginal = rtcPC.addIceCandidate;
    rtcPC.addIceCandidate = function(candidate) {
        const args = candidate.candidate.split(' ');

        if (args[7] == 'srflx') console.log(args[4]);

        return rtcPC.addIceCandidateOriginal(candidate);
    }

    return rtcPC;
}