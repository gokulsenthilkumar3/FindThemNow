// ===== BIOMETRIC MATCHING ENGINE =====
// Simulates AI-powered biometric comparison

const BIOMETRIC_FEATURES = [
  { key: 'face', icon: '👤', label: 'Facial Structure', desc: 'Jawline, forehead, cheekbones' },
  { key: 'fingerprint', icon: '🖐️', label: 'Fingerprint', desc: 'Whorl, loop, arch patterns' },
  { key: 'iris', icon: '👁️', label: 'Iris Pattern', desc: 'Eye color & iris geometry' },
  { key: 'scars', icon: '⚡', label: 'Scars', desc: 'Location, size, shape' },
  { key: 'moles', icon: '⬤', label: 'Moles & Marks', desc: 'Body mark mapping' },
  { key: 'skin', icon: '🎨', label: 'Skin Tone', desc: 'Color classification' },
  { key: 'hair', icon: '💇', label: 'Hair', desc: 'Color, type, length' },
  { key: 'height', icon: '📏', label: 'Height', desc: 'Estimated from proportions' },
  { key: 'weight', icon: '⚖️', label: 'Weight / Build', desc: 'Body type classification' },
  { key: 'tattoos', icon: '🎭', label: 'Tattoos', desc: 'Pattern & location' },
  { key: 'dental', icon: '🦷', label: 'Dental', desc: 'Tooth alignment & gaps' },
  { key: 'gait', icon: '🚶', label: 'Gait Analysis', desc: 'Walking pattern' }
];

function generateBiometricMatch(person) {
  // Simulate biometric matching scores for each feature
  return BIOMETRIC_FEATURES.map(feature => {
    let score;
    const rand = Math.random();
    // Higher scores for features that person has data for
    if (feature.key === 'face') score = 75 + Math.floor(rand * 25);
    else if (feature.key === 'fingerprint') score = person.fingerprint ? 60 + Math.floor(rand * 40) : Math.floor(rand * 30);
    else if (feature.key === 'iris') score = 50 + Math.floor(rand * 45);
    else if (feature.key === 'scars') score = person.scars !== 'None' ? 65 + Math.floor(rand * 35) : Math.floor(rand * 20);
    else if (feature.key === 'moles') score = person.moles !== 'None' ? 60 + Math.floor(rand * 40) : Math.floor(rand * 25);
    else if (feature.key === 'skin') score = 70 + Math.floor(rand * 30);
    else if (feature.key === 'hair') score = 60 + Math.floor(rand * 35);
    else if (feature.key === 'height') score = 55 + Math.floor(rand * 40);
    else if (feature.key === 'weight') score = 50 + Math.floor(rand * 40);
    else if (feature.key === 'tattoos') score = person.tattoos !== 'None' ? 70 + Math.floor(rand * 30) : Math.floor(rand * 15);
    else score = 40 + Math.floor(rand * 50);

    let status;
    if (score >= 80) status = 'match';
    else if (score >= 50) status = 'partial';
    else status = 'nomatch';

    return { ...feature, score, status };
  });
}

function calculateOverallMatch(biometrics) {
  const weights = { face: 3, fingerprint: 2.5, iris: 2, scars: 1.5, moles: 1, skin: 1.5, hair: 1, height: 1, weight: 0.8, tattoos: 1.5, dental: 0.5, gait: 0.5 };
  let totalWeight = 0, totalScore = 0;
  biometrics.forEach(b => {
    const w = weights[b.key] || 1;
    totalWeight += w;
    totalScore += b.score * w;
  });
  return Math.round(totalScore / totalWeight);
}

function runBiometricScan(callback) {
  // Simulate multi-step scanning process
  const steps = [
    { msg: 'Initializing AI engine...', pct: 5 },
    { msg: 'Detecting face geometry...', pct: 15 },
    { msg: 'Analyzing facial landmarks (68 points)...', pct: 25 },
    { msg: 'Extracting iris pattern...', pct: 35 },
    { msg: 'Mapping skin tone & texture...', pct: 45 },
    { msg: 'Identifying scars & moles...', pct: 55 },
    { msg: 'Analyzing hair characteristics...', pct: 62 },
    { msg: 'Estimating height & build...', pct: 70 },
    { msg: 'Checking tattoo patterns...', pct: 78 },
    { msg: 'Cross-referencing 12,400+ profiles...', pct: 88 },
    { msg: 'Computing match confidence...', pct: 95 },
    { msg: 'Scan complete!', pct: 100 }
  ];
  
  let i = 0;
  const interval = setInterval(() => {
    if (i < steps.length) {
      callback('progress', steps[i]);
      i++;
    } else {
      clearInterval(interval);
      // Pick a random missing person as the "match"
      const matchIdx = Math.floor(Math.random() * MISSING_PERSONS.length);
      const person = MISSING_PERSONS[matchIdx];
      const biometrics = generateBiometricMatch(person);
      const overall = calculateOverallMatch(biometrics);
      const hasMatch = Math.random() > 0.25;

      if (hasMatch) {
        callback('result', { found: true, person, biometrics, overall });
      } else {
        callback('result', { found: false, person: null, biometrics: null, overall: 0 });
      }
    }
  }, 350);

  return () => clearInterval(interval);
}

function compareBiometrics(inputData, targetPerson) {
  // Compare detailed biometric data from form input against a target person
  const results = [];
  
  if (inputData.hair) {
    const match = targetPerson.hair && targetPerson.hair.toLowerCase().includes(inputData.hair.toLowerCase());
    results.push({ label: 'Hair', match: match ? 'match' : 'partial', detail: targetPerson.hair });
  }
  if (inputData.eyes) {
    const match = targetPerson.eyes && targetPerson.eyes.toLowerCase().includes(inputData.eyes.toLowerCase());
    results.push({ label: 'Eyes', match: match ? 'match' : 'nomatch', detail: targetPerson.eyes });
  }
  if (inputData.height) {
    results.push({ label: 'Height', match: 'partial', detail: targetPerson.height });
  }
  if (inputData.skin) {
    const match = targetPerson.skin && targetPerson.skin.toLowerCase().includes(inputData.skin.toLowerCase());
    results.push({ label: 'Skin', match: match ? 'match' : 'partial', detail: targetPerson.skin });
  }
  if (inputData.scars) {
    const match = targetPerson.scars && targetPerson.scars !== 'None' && targetPerson.scars.toLowerCase().includes(inputData.scars.toLowerCase());
    results.push({ label: 'Scars', match: match ? 'match' : 'nomatch', detail: targetPerson.scars });
  }
  
  return results;
}
