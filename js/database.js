// ===== MISSING PERSONS DATABASE =====
const MISSING_PERSONS = [
  { id: 'MP001', name: 'Priya Nair', age: 28, gender: 'Female', country: 'India', city: 'Chennai',
    lastSeen: '2024-11-12', status: 'missing', emoji: '👩', bgColor: '#1a1a2e',
    description: 'Blue saree. Last seen near Central Railway Station. Medium height, dark hair.',
    height: '5\'4"', weight: '55 kg', hair: 'Black, long', eyes: 'Brown', skin: 'Medium brown',
    scars: 'Small scar on left wrist', moles: 'Mole on right cheek', tattoos: 'None',
    fingerprint: 'Whorl pattern', emergency: '112' },
  { id: 'MP002', name: 'Maria Santos', age: 14, gender: 'Female', country: 'Brazil', city: 'São Paulo',
    lastSeen: '2024-11-05', status: 'missing', emoji: '🧒', bgColor: '#1a2238',
    description: 'School uniform, navy blue. Last seen near Paulista Avenue. Shy personality.',
    height: '5\'1"', weight: '42 kg', hair: 'Dark brown, shoulder-length', eyes: 'Brown', skin: 'Light brown',
    scars: 'None', moles: 'None', tattoos: 'None', fingerprint: 'Loop pattern', emergency: '190' },
  { id: 'MP003', name: 'Ahmed Al-Rashid', age: 52, gender: 'Male', country: 'UAE', city: 'Dubai',
    lastSeen: '2024-10-28', status: 'missing', emoji: '👨', bgColor: '#2a1a0e',
    description: 'White kandura. Last seen near Gold Souk. Has a slight limp on right leg.',
    height: '5\'10"', weight: '78 kg', hair: 'Gray, short', eyes: 'Dark brown', skin: 'Olive',
    scars: 'Surgical scar on right knee', moles: 'Mole near left ear', tattoos: 'None',
    fingerprint: 'Arch pattern', emergency: '999' },
  { id: 'MP004', name: 'Li Wei', age: 67, gender: 'Male', country: 'China', city: 'Shanghai',
    lastSeen: '2024-11-18', status: 'missing', emoji: '👴', bgColor: '#0e2a1a',
    description: 'Elderly with memory condition. Last seen near People\'s Square wearing gray jacket.',
    height: '5\'6"', weight: '62 kg', hair: 'White, thin', eyes: 'Dark brown', skin: 'Light',
    scars: 'None', moles: 'Multiple on neck', tattoos: 'None', fingerprint: 'Whorl pattern', emergency: '110' },
  { id: 'MP005', name: 'Sofia Andersen', age: 9, gender: 'Female', country: 'Denmark', city: 'Copenhagen',
    lastSeen: '2024-11-20', status: 'missing', emoji: '👧', bgColor: '#2a0e1a',
    description: 'Red jacket, blonde hair. Last seen near Tivoli Gardens with school group.',
    height: '4\'3"', weight: '28 kg', hair: 'Blonde, braided', eyes: 'Blue', skin: 'Fair',
    scars: 'None', moles: 'None', tattoos: 'None', fingerprint: 'Loop pattern', emergency: '112' },
  { id: 'MP006', name: 'James Okafor', age: 35, gender: 'Male', country: 'Nigeria', city: 'Lagos',
    lastSeen: '2024-11-01', status: 'missing', emoji: '👨', bgColor: '#1a0e2a',
    description: 'Last seen at Lekki market. Wearing jeans and white t-shirt. Well-built.',
    height: '6\'0"', weight: '82 kg', hair: 'Black, short', eyes: 'Dark brown', skin: 'Dark brown',
    scars: 'Burn scar on left forearm', moles: 'None', tattoos: 'Tribal tattoo on right arm',
    fingerprint: 'Whorl pattern', emergency: '112' },
  { id: 'MP007', name: 'Yuki Tanaka', age: 22, gender: 'Female', country: 'Japan', city: 'Tokyo',
    lastSeen: '2024-11-15', status: 'found', emoji: '👩', bgColor: '#0e1a2a',
    description: 'University student. Found safe after 3 days. Was at a friend\'s house.',
    height: '5\'3"', weight: '48 kg', hair: 'Black, dyed tips red', eyes: 'Dark brown', skin: 'Light',
    scars: 'None', moles: 'Small mole under left eye', tattoos: 'Small butterfly on ankle',
    fingerprint: 'Loop pattern', emergency: '110' },
  { id: 'MP008', name: 'Carlos Mendez', age: 41, gender: 'Male', country: 'Mexico', city: 'Mexico City',
    lastSeen: '2024-10-22', status: 'missing', emoji: '👨', bgColor: '#2a1a1a',
    description: 'Construction worker. Last seen leaving work site near Reforma Avenue.',
    height: '5\'8"', weight: '75 kg', hair: 'Black, wavy', eyes: 'Brown', skin: 'Medium brown',
    scars: 'Scar on chin', moles: 'Mole on forehead', tattoos: 'Cross tattoo on chest',
    fingerprint: 'Arch pattern', emergency: '911' },
  { id: 'MP009', name: 'Aisha Mohammed', age: 19, gender: 'Female', country: 'Kenya', city: 'Nairobi',
    lastSeen: '2024-11-08', status: 'missing', emoji: '👩', bgColor: '#1a2a0e',
    description: 'College student wearing hijab. Last seen near University of Nairobi campus.',
    height: '5\'5"', weight: '52 kg', hair: 'Black, covered', eyes: 'Dark brown', skin: 'Dark brown',
    scars: 'None', moles: 'None', tattoos: 'None', fingerprint: 'Whorl pattern', emergency: '999' },
  { id: 'MP010', name: 'Ivan Petrov', age: 45, gender: 'Male', country: 'Russia', city: 'Moscow',
    lastSeen: '2024-11-03', status: 'missing', emoji: '👨', bgColor: '#0e0e2a',
    description: 'Engineer. Last seen near Kurskaya metro station. Wearing black coat and glasses.',
    height: '5\'11"', weight: '85 kg', hair: 'Brown, receding', eyes: 'Green', skin: 'Fair',
    scars: 'Appendectomy scar', moles: 'None', tattoos: 'None', fingerprint: 'Loop pattern', emergency: '112' },
  { id: 'MP011', name: 'Elena Rodriguez', age: 31, gender: 'Female', country: 'Spain', city: 'Barcelona',
    lastSeen: '2024-11-22', status: 'missing', emoji: '👩', bgColor: '#2a0e0e',
    description: 'Photographer. Last seen at La Boqueria market. Carrying camera equipment.',
    height: '5\'6"', weight: '58 kg', hair: 'Auburn, curly', eyes: 'Hazel', skin: 'Light olive',
    scars: 'None', moles: 'Beauty mark above lip', tattoos: 'Camera tattoo on wrist',
    fingerprint: 'Arch pattern', emergency: '112' },
  { id: 'MP012', name: 'Kwame Asante', age: 8, gender: 'Male', country: 'Ghana', city: 'Accra',
    lastSeen: '2024-11-19', status: 'missing', emoji: '👦', bgColor: '#1a1a0e',
    description: 'School boy. Did not return from school. Wearing green and white uniform.',
    height: '4\'1"', weight: '25 kg', hair: 'Black, short', eyes: 'Dark brown', skin: 'Dark brown',
    scars: 'Small cut scar on right temple', moles: 'None', tattoos: 'None',
    fingerprint: 'Loop pattern', emergency: '999' }
];

function getPersonById(id) {
  return MISSING_PERSONS.find(p => p.id === id);
}

function searchPersons(query) {
  const q = query.toLowerCase();
  return MISSING_PERSONS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.city.toLowerCase().includes(q) ||
    p.country.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

function getPersonsByStatus(status) {
  return MISSING_PERSONS.filter(p => p.status === status);
}
