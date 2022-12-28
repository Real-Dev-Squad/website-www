import {
  HMSReactiveStore,
  selectIsConnectedToRoom,
  selectPeers,
  selectIsLocalVideoEnabled,
  selectIsLocalAudioEnabled,
  selectIsSomeoneScreenSharing,
  selectIsLocalScreenShared,
  selectPeerScreenSharing,
  selectScreenShareByPeerID,
} from 'https://cdn.skypack.dev/@100mslive/hms-video-store';

// Initialize HMS store
const hmsManager = new HMSReactiveStore();
hmsManager.triggerOnSubscribe();
const hmsStore = hmsManager.getStore();
const hmsActions = hmsManager.getActions();

const tokenEndpoint =
  'https://prod-in2.100ms.live/hmsapi/sanketdhabardelive.app.100ms.live';
const roles = ['presenter', 'guest'];

const form = document.querySelector('.joining-form');
const nameEl = document.querySelector('#name');
const leaveBtn = document.querySelector('.btn-leave');
const conference = document.querySelector('.conference');
const screenShareVideo = document.querySelector('.screen-share-video');
const presenterVideo = document.querySelector('.presenter-video');
const screenShareBtn = document.querySelector('.btn-share-screen');
const muteAudioBtn = document.querySelector('.btn-mute-audio');
const muteVideoBtn = document.querySelector('.btn-hide-video');
const presenterName = document.querySelector('.presenter-name');
const screenShareStatus = document.querySelector('.screen-share-status');
const presenterController = document.querySelector('.presenter-controller');

form.onsubmit = handleSubmit;
leaveBtn.onclick = handleLeave;
muteVideoBtn.onclick = handlePresenterVideo;
muteAudioBtn.onclick = handlePresenterAudio;
screenShareBtn.onclick = handleScreenShare;
leaveBtn.onclick = handleLeave;
// Cleanup if user refreshes the tab or navigates away
window.onunload = window.onbeforeunload = handleLeave;

function hide(el) {
  el.style.display = 'none';
}

function show(el) {
  el.style.display = '';
}

async function handleSubmit(e) {
  e.preventDefault();
  const userName = nameEl.value;
  const userType = window.location.search.split('=')[1];
  const isValidUrl = roles.includes(userType);

  if (isValidUrl) {
    const token = await getToken(userName, userType);
    hmsActions.join({
      userName,
      authToken: token,
    });
  } else {
    console.error('Not valid url');
  }
}

function handleLeave() {
  hmsActions.leave();
}

function isStreaming() {
  return window.location.search.split('=')[1] === 'presenter';
}

async function getToken(userName, userType) {
  try {
    const response = await fetch(`${tokenEndpoint}/api/token`, {
      method: 'POST',
      body: JSON.stringify({
        room_id: '6399de60b806bb263907e17d',
        role: userType === 'guest' ? 'guest' : 'presenter',
        user_id: userName,
      }),
    });
    const { token } = await response.json();
    return token;
  } catch (e) {
    console.log(e);
  }
}

// *************************
// Change screen based on connected to room or not
// *************************

// Showing the required elements on connection/disconnection
function onConnection(isConnected) {
  if (isConnected) {
    hide(form);
    show(conference);
    show(leaveBtn);
    if (isStreaming()) {
      show(presenterController);
    } else {
      hide(presenterController);
    }
  } else {
    show(form);
    hide(conference);
    hide(leaveBtn);
  }
}

// Listen to the connection state
hmsStore.subscribe(onConnection, selectIsConnectedToRoom);

// *************************
// Render presenter video
// *************************

function renderVideo(peer) {
  presenterName.textContent = peer.name;
  hmsActions.attachVideo(peer.videoTrack, presenterVideo);
}

function renderPeers() {
  const peers = hmsStore.getState(selectPeers);
  console.log({ peers });
  peers.forEach((peer) => {
    if (peer?.videoTrack) {
      renderVideo(peer);
    }
  });
}

// subscribe to the peers, so render is called whenever there is a change like peer join and leave
hmsStore.subscribe(renderPeers, selectPeers);

// *************************
// Mute/Unmute video/audio
// *************************

function handlePresenterVideo() {
  const videoEnabled = !hmsStore.getState(selectIsLocalVideoEnabled);
  hmsActions.setLocalVideoEnabled(videoEnabled);
  muteVideoBtn.textContent = videoEnabled ? 'Hide' : 'Unhide';
  // Re-render video tile
  renderPeers();
}

function handlePresenterAudio() {
  const audioEnabled = !hmsStore.getState(selectIsLocalAudioEnabled);
  hmsActions.setLocalAudioEnabled(audioEnabled);
  muteAudioBtn.textContent = audioEnabled ? 'Mute' : 'Unmute';
}

// *************************
// Share screen
// *************************

async function handleScreenShare() {
  const screenShareOn = !hmsStore.getState(selectIsSomeoneScreenSharing);
  await hmsActions.setScreenShareEnabled(screenShareOn);
  screenShareBtn.textContent = screenShareOn ? 'Stop' : 'Share';
  showScreenShareVideo();
}

async function showScreenShareVideo() {
  const screenShareOn = hmsStore.getState(selectIsSomeoneScreenSharing);
  if (screenShareOn) {
    const amIScreenSharing = hmsStore.getState(selectIsLocalScreenShared);
    const presenter = hmsStore.getState(selectPeerScreenSharing);
    const screenShareVideoTrack = hmsStore.getState(
      selectScreenShareByPeerID(presenter?.id),
    );

    if (amIScreenSharing) {
      screenShareStatus.textContent = 'Screen share started!!!';
    } else {
      hide(screenShareStatus);
      show(screenShareVideo);
      await hmsActions.attachVideo(screenShareVideoTrack?.id, screenShareVideo);
    }
  } else {
    screenShareStatus.textContent =
      'Welcome! Sit back and relax till streaming start.';
    hide(screenShareVideo);
    show(screenShareStatus);
  }
}

// subscribe to the peers, so showScreenShareVideo is called whenever there is a change like peer join and leave
hmsStore.subscribe(showScreenShareVideo, selectPeers);
