// lib/Enhancement4_DataChannel.ts
export function createDataChannel(isInitiator: boolean) {
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });
  let channel: RTCDataChannel;

  if (isInitiator) {
    channel = pc.createDataChannel("drills");
    setupChannel(channel);
    pc.createOffer().then((o) => pc.setLocalDescription(o));
  } else {
    pc.ondatachannel = ({ channel: ch }) => setupChannel(ch);
  }

  pc.onicecandidate = ({ candidate }) => {
    // send candidate to peer via signaling
  };

  function setupChannel(ch: RTCDataChannel) {
    ch.onopen = () => console.log("DataChannel open");
    ch.onmessage = (e) => console.log("Received:", e.data);
  }

  return pc;
}
