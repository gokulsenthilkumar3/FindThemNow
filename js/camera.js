// ===== LIVE CAMERA MODULE =====
let cameraStream = null;
let scannerActive = false;
let scanCleanup = null;

async function startCamera(videoElement) {
  try {
    const constraints = {
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
    };
    cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = cameraStream;
    await videoElement.play();
    return true;
  } catch (err) {
    console.error('Camera error:', err);
    return false;
  }
}

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }
  scannerActive = false;
  if (scanCleanup) { scanCleanup(); scanCleanup = null; }
}

async function switchCamera(videoElement) {
  const currentFacing = cameraStream?.getVideoTracks()[0]?.getSettings()?.facingMode;
  stopCamera();
  try {
    const constraints = {
      video: { facingMode: currentFacing === 'user' ? 'environment' : 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
    };
    cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = cameraStream;
    await videoElement.play();
  } catch (err) {
    console.error('Switch camera error:', err);
  }
}

function startLiveScan(onResult) {
  scannerActive = true;
  let scanCount = 0;

  const interval = setInterval(() => {
    if (!scannerActive) { clearInterval(interval); return; }
    scanCount++;
    // Simulate periodic scanning
    if (scanCount % 8 === 0 && Math.random() > 0.6) {
      const person = MISSING_PERSONS[Math.floor(Math.random() * MISSING_PERSONS.length)];
      const biometrics = generateBiometricMatch(person);
      const overall = calculateOverallMatch(biometrics);
      if (overall > 65) {
        onResult({ found: true, person, biometrics, overall });
      }
    }
  }, 500);

  scanCleanup = () => clearInterval(interval);
}

function captureFrame(videoElement) {
  const canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoElement, 0, 0);
  return canvas.toDataURL('image/jpeg', 0.8);
}
