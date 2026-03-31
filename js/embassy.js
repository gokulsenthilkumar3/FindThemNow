// ===== EMBASSY DATABASE =====
const EMBASSIES = [
  // US Embassies
  { nationality: 'USA', country: 'India', city: 'New Delhi', phone: '+91-11-2419-8000', emergency: '+91-11-2419-8000',
    address: 'Shantipath, Chanakyapuri, New Delhi', email: 'acsnd@state.gov', flag: '🇺🇸', hostFlag: '🇮🇳' },
  { nationality: 'USA', country: 'UK', city: 'London', phone: '+44-20-7499-9000', emergency: '+44-20-7499-9000',
    address: '33 Nine Elms Lane, London', email: 'SCSLondon@state.gov', flag: '🇺🇸', hostFlag: '🇬🇧' },
  { nationality: 'USA', country: 'Japan', city: 'Tokyo', phone: '+81-3-3224-5000', emergency: '+81-3-3224-5000',
    address: '1-10-5 Akasaka, Minato-ku, Tokyo', email: 'TokyoACS@state.gov', flag: '🇺🇸', hostFlag: '🇯🇵' },
  { nationality: 'USA', country: 'UAE', city: 'Abu Dhabi', phone: '+971-2-414-2200', emergency: '+971-2-414-2200',
    address: 'Embassies District, Abu Dhabi', email: 'aaborncitizen@state.gov', flag: '🇺🇸', hostFlag: '🇦🇪' },
  { nationality: 'USA', country: 'Germany', city: 'Berlin', phone: '+49-30-8305-0', emergency: '+49-30-8305-0',
    address: 'Clayallee 170, 14195 Berlin', email: 'ACSBerlin@state.gov', flag: '🇺🇸', hostFlag: '🇩🇪' },
  // Indian Embassies
  { nationality: 'India', country: 'USA', city: 'Washington D.C.', phone: '+1-202-939-7000', emergency: '+1-202-939-7000',
    address: '2107 Massachusetts Ave NW, Washington', email: 'cons.washington@mea.gov.in', flag: '🇮🇳', hostFlag: '🇺🇸' },
  { nationality: 'India', country: 'UK', city: 'London', phone: '+44-20-8836-8484', emergency: '+44-7767-464724',
    address: 'India House, Aldwych, London', email: 'hc.london@mea.gov.in', flag: '🇮🇳', hostFlag: '🇬🇧' },
  { nationality: 'India', country: 'UAE', city: 'Abu Dhabi', phone: '+971-2-449-2700', emergency: '+971-50-948-4848',
    address: 'Plot 10, Diplomatic Area, Abu Dhabi', email: 'amb.abudhabi@mea.gov.in', flag: '🇮🇳', hostFlag: '🇦🇪' },
  { nationality: 'India', country: 'Australia', city: 'Canberra', phone: '+61-2-6273-3999', emergency: '+61-416-121-643',
    address: '3-5 Moonah Place, Yarralumla, Canberra', email: 'hoc.canberra@mea.gov.in', flag: '🇮🇳', hostFlag: '🇦🇺' },
  { nationality: 'India', country: 'Japan', city: 'Tokyo', phone: '+81-3-3262-2391', emergency: '+81-90-2255-1645',
    address: '2-2-11 Kudan-Minami, Chiyoda-ku, Tokyo', email: 'dcm.tokyo@mea.gov.in', flag: '🇮🇳', hostFlag: '🇯🇵' },
  // UK Embassies
  { nationality: 'UK', country: 'USA', city: 'Washington D.C.', phone: '+1-202-588-6500', emergency: '+1-202-588-6500',
    address: '3100 Massachusetts Ave NW, Washington', email: 'britishembassyenquiries@gmail.com', flag: '🇬🇧', hostFlag: '🇺🇸' },
  { nationality: 'UK', country: 'India', city: 'New Delhi', phone: '+91-11-2419-2100', emergency: '+91-11-2419-2100',
    address: 'Shantipath, Chanakyapuri, New Delhi', email: 'web.newdelhi@fco.gov.uk', flag: '🇬🇧', hostFlag: '🇮🇳' },
  { nationality: 'UK', country: 'France', city: 'Paris', phone: '+33-1-44-51-31-00', emergency: '+33-1-44-51-31-00',
    address: '35 Rue du Faubourg St Honoré, Paris', email: 'webmaster.paris@fco.gov.uk', flag: '🇬🇧', hostFlag: '🇫🇷' },
  { nationality: 'UK', country: 'UAE', city: 'Dubai', phone: '+971-4-309-4444', emergency: '+971-4-309-4444',
    address: 'Al Seef Road, Bur Dubai', email: 'dubai.enquiries@fco.gov.uk', flag: '🇬🇧', hostFlag: '🇦🇪' },
  // Australian Embassies
  { nationality: 'Australia', country: 'India', city: 'New Delhi', phone: '+91-11-4139-9900', emergency: '+91-11-4139-9900',
    address: '1/50-G Shantipath, Chanakyapuri, New Delhi', email: 'ahc.newdelhi@dfat.gov.au', flag: '🇦🇺', hostFlag: '🇮🇳' },
  { nationality: 'Australia', country: 'USA', city: 'Washington D.C.', phone: '+1-202-797-3000', emergency: '+1-202-797-3000',
    address: '1601 Massachusetts Ave NW, Washington', email: 'embassy.washington@dfat.gov.au', flag: '🇦🇺', hostFlag: '🇺🇸' },
  { nationality: 'Australia', country: 'Japan', city: 'Tokyo', phone: '+81-3-5232-4111', emergency: '+81-3-5232-4111',
    address: '2-1-14 Mita, Minato-ku, Tokyo', email: 'embassy.tokyo@dfat.gov.au', flag: '🇦🇺', hostFlag: '🇯🇵' },
  // German Embassies
  { nationality: 'Germany', country: 'India', city: 'New Delhi', phone: '+91-11-4419-9199', emergency: '+91-11-4419-9199',
    address: '6/50G Shantipath, Chanakyapuri, New Delhi', email: 'info@new-delhi.diplo.de', flag: '🇩🇪', hostFlag: '🇮🇳' },
  { nationality: 'Germany', country: 'USA', city: 'Washington D.C.', phone: '+1-202-298-4000', emergency: '+1-202-298-4000',
    address: '4645 Reservoir Rd NW, Washington', email: 'info@washington.diplo.de', flag: '🇩🇪', hostFlag: '🇺🇸' },
  // French Embassies
  { nationality: 'France', country: 'India', city: 'New Delhi', phone: '+91-11-4319-6100', emergency: '+91-11-4319-6100',
    address: '2/50-E Shantipath, Chanakyapuri, New Delhi', email: 'info@ambafrance-in.org', flag: '🇫🇷', hostFlag: '🇮🇳' },
  { nationality: 'France', country: 'USA', city: 'Washington D.C.', phone: '+1-202-944-6000', emergency: '+1-202-944-6000',
    address: '4101 Reservoir Rd NW, Washington', email: 'info@ambafrance-us.org', flag: '🇫🇷', hostFlag: '🇺🇸' },
  // Japanese Embassies
  { nationality: 'Japan', country: 'India', city: 'New Delhi', phone: '+91-11-4610-4610', emergency: '+91-11-4610-4610',
    address: '50-G Shantipath, Chanakyapuri, New Delhi', email: 'jpemb@nd.mofa.go.jp', flag: '🇯🇵', hostFlag: '🇮🇳' },
  { nationality: 'Japan', country: 'USA', city: 'Washington D.C.', phone: '+1-202-238-6700', emergency: '+1-202-238-6700',
    address: '2520 Massachusetts Ave NW, Washington', email: 'jicc@ws.mofa.go.jp', flag: '🇯🇵', hostFlag: '🇺🇸' },
  // Brazilian Embassies
  { nationality: 'Brazil', country: 'USA', city: 'Washington D.C.', phone: '+1-202-238-2700', emergency: '+1-202-238-2700',
    address: '3006 Massachusetts Ave NW, Washington', email: 'contact@brasilemb.org', flag: '🇧🇷', hostFlag: '🇺🇸' },
  { nationality: 'Brazil', country: 'India', city: 'New Delhi', phone: '+91-11-3035-3535', emergency: '+91-11-3035-3535',
    address: '8 Aurangzeb Road, New Delhi', email: 'brasemb.novadelhi@itamaraty.gov.br', flag: '🇧🇷', hostFlag: '🇮🇳' }
];

const NATIONALITIES = [...new Set(EMBASSIES.map(e => e.nationality))];
const HOST_COUNTRIES = [...new Set(EMBASSIES.map(e => e.country))];

function findEmbassies(nationality, hostCountry) {
  return EMBASSIES.filter(e => {
    const natMatch = !nationality || e.nationality.toLowerCase().includes(nationality.toLowerCase());
    const hostMatch = !hostCountry || e.country.toLowerCase().includes(hostCountry.toLowerCase());
    return natMatch && hostMatch;
  });
}

function getEmbassiesByNationality(nationality) {
  return EMBASSIES.filter(e => e.nationality === nationality);
}
