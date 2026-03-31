// ===== GLOBAL EMERGENCY SERVICES DATA =====
const COUNTRIES = [
  {f:'🇮🇳',n:'India',e:'112',p:'100',a:'108',fire:'101',c:'1098',code:'+91'},
  {f:'🇺🇸',n:'USA',e:'911',p:'911',a:'911',fire:'911',c:'1-800-843-5678',code:'+1'},
  {f:'🇬🇧',n:'UK',e:'999',p:'999',a:'999',fire:'999',c:'116000',code:'+44'},
  {f:'🇦🇺',n:'Australia',e:'000',p:'000',a:'000',fire:'000',c:'1800551800',code:'+61'},
  {f:'🇨🇦',n:'Canada',e:'911',p:'911',a:'911',fire:'911',c:'1-800-668-6868',code:'+1'},
  {f:'🇩🇪',n:'Germany',e:'112',p:'110',a:'112',fire:'112',c:'0800 111 0 333',code:'+49'},
  {f:'🇫🇷',n:'France',e:'112',p:'17',a:'15',fire:'18',c:'119',code:'+33'},
  {f:'🇯🇵',n:'Japan',e:'110',p:'110',a:'119',fire:'119',c:'189',code:'+81'},
  {f:'🇧🇷',n:'Brazil',e:'190',p:'190',a:'192',fire:'193',c:'100',code:'+55'},
  {f:'🇿🇦',n:'South Africa',e:'112',p:'10111',a:'10177',fire:'10177',c:'0800055555',code:'+27'},
  {f:'🇦🇪',n:'UAE',e:'999',p:'999',a:'998',fire:'997',c:'800988',code:'+971'},
  {f:'🇸🇦',n:'Saudi Arabia',e:'911',p:'999',a:'997',fire:'998',c:'1919',code:'+966'},
  {f:'🇨🇳',n:'China',e:'110',p:'110',a:'120',fire:'119',c:'12338',code:'+86'},
  {f:'🇷🇺',n:'Russia',e:'112',p:'102',a:'103',fire:'101',c:'8-800-2000-122',code:'+7'},
  {f:'🇲🇽',n:'Mexico',e:'911',p:'911',a:'911',fire:'911',c:'800-290-0024',code:'+52'},
  {f:'🇮🇩',n:'Indonesia',e:'112',p:'110',a:'118',fire:'113',c:'129',code:'+62'},
  {f:'🇵🇰',n:'Pakistan',e:'1122',p:'15',a:'1122',fire:'16',c:'1099',code:'+92'},
  {f:'🇧🇩',n:'Bangladesh',e:'999',p:'999',a:'199',fire:'199',c:'1098',code:'+880'},
  {f:'🇳🇬',n:'Nigeria',e:'112',p:'112',a:'112',fire:'112',c:'08001000600',code:'+234'},
  {f:'🇰🇪',n:'Kenya',e:'112',p:'999',a:'999',fire:'999',c:'116',code:'+254'},
  {f:'🇹🇷',n:'Turkey',e:'112',p:'155',a:'112',fire:'110',c:'183',code:'+90'},
  {f:'🇮🇹',n:'Italy',e:'112',p:'113',a:'118',fire:'115',c:'19696',code:'+39'},
  {f:'🇪🇸',n:'Spain',e:'112',p:'091',a:'112',fire:'112',c:'900202010',code:'+34'},
  {f:'🇵🇭',n:'Philippines',e:'911',p:'117',a:'161',fire:'911',c:'163',code:'+63'},
  {f:'🇰🇷',n:'South Korea',e:'112',p:'112',a:'119',fire:'119',c:'1391',code:'+82'},
  {f:'🇸🇬',n:'Singapore',e:'999',p:'999',a:'995',fire:'995',c:'1800-777-0000',code:'+65'},
  {f:'🇲🇾',n:'Malaysia',e:'999',p:'999',a:'999',fire:'994',c:'15999',code:'+60'},
  {f:'🇹🇭',n:'Thailand',e:'191',p:'191',a:'1554',fire:'199',c:'1300',code:'+66'},
  {f:'🇪🇬',n:'Egypt',e:'123',p:'122',a:'123',fire:'180',c:'16000',code:'+20'},
  {f:'🇦🇷',n:'Argentina',e:'911',p:'911',a:'107',fire:'100',c:'102',code:'+54'},
  {f:'🇨🇴',n:'Colombia',e:'112',p:'112',a:'132',fire:'119',c:'141',code:'+57'},
  {f:'🇳🇱',n:'Netherlands',e:'112',p:'112',a:'112',fire:'112',c:'0800-2002',code:'+31'},
  {f:'🇸🇪',n:'Sweden',e:'112',p:'112',a:'112',fire:'112',c:'116111',code:'+46'},
  {f:'🇳🇴',n:'Norway',e:'112',p:'112',a:'113',fire:'110',c:'116111',code:'+47'},
  {f:'🇨🇭',n:'Switzerland',e:'112',p:'117',a:'144',fire:'118',c:'147',code:'+41'},
  {f:'🇵🇹',n:'Portugal',e:'112',p:'112',a:'112',fire:'112',c:'116000',code:'+351'},
  {f:'🇬🇷',n:'Greece',e:'112',p:'100',a:'166',fire:'199',c:'1056',code:'+30'},
  {f:'🇮🇱',n:'Israel',e:'101',p:'100',a:'101',fire:'102',c:'1201',code:'+972'},
  {f:'🇳🇿',n:'New Zealand',e:'111',p:'111',a:'111',fire:'111',c:'0800543754',code:'+64'},
  {f:'🇦🇹',n:'Austria',e:'112',p:'133',a:'144',fire:'122',c:'147',code:'+43'},
  {f:'🇲🇦',n:'Morocco',e:'190',p:'190',a:'150',fire:'15',c:'116',code:'+212'},
  {f:'🇬🇭',n:'Ghana',e:'999',p:'191',a:'193',fire:'192',c:'116',code:'+233'},
  {f:'🇻🇳',n:'Vietnam',e:'113',p:'113',a:'115',fire:'114',c:'1800599921',code:'+84'},
  {f:'🇺🇦',n:'Ukraine',e:'112',p:'102',a:'103',fire:'101',c:'0-800-500-225',code:'+380'},
  {f:'🇵🇱',n:'Poland',e:'112',p:'997',a:'999',fire:'998',c:'116111',code:'+48'},
  {f:'🇷🇴',n:'Romania',e:'112',p:'112',a:'112',fire:'112',c:'116111',code:'+40'},
  {f:'🇭🇺',n:'Hungary',e:'112',p:'107',a:'104',fire:'105',c:'116000',code:'+36'},
  {f:'🇨🇿',n:'Czech Republic',e:'112',p:'158',a:'155',fire:'150',c:'116111',code:'+420'},
  {f:'🇩🇰',n:'Denmark',e:'112',p:'112',a:'112',fire:'112',c:'116111',code:'+45'},
  {f:'🇫🇮',n:'Finland',e:'112',p:'112',a:'112',fire:'112',c:'116111',code:'+358'},
  {f:'🇧🇪',n:'Belgium',e:'112',p:'101',a:'112',fire:'112',c:'116000',code:'+32'},
  {f:'🇮🇪',n:'Ireland',e:'112',p:'112',a:'112',fire:'112',c:'116000',code:'+353'},
  {f:'🇱🇰',n:'Sri Lanka',e:'119',p:'119',a:'110',fire:'110',c:'1929',code:'+94'},
  {f:'🇳🇵',n:'Nepal',e:'100',p:'100',a:'102',fire:'101',c:'104',code:'+977'},
  {f:'🇪🇹',n:'Ethiopia',e:'911',p:'991',a:'907',fire:'939',c:'116',code:'+251'},
  {f:'🇹🇿',n:'Tanzania',e:'114',p:'112',a:'114',fire:'114',c:'116',code:'+255'},
  {f:'🇵🇪',n:'Peru',e:'105',p:'105',a:'116',fire:'116',c:'100',code:'+51'},
  {f:'🇨🇱',n:'Chile',e:'131',p:'133',a:'131',fire:'132',c:'147',code:'+56'},
  {f:'🇧🇴',n:'Bolivia',e:'110',p:'110',a:'118',fire:'119',c:'156',code:'+591'},
  {f:'🇺🇾',n:'Uruguay',e:'911',p:'911',a:'105',fire:'104',c:'0800-5050',code:'+598'}
];

// Emergency type categories
const EMERGENCY_TYPES = [
  { icon: '🆘', label: 'General Emergency', key: 'e', color: 'var(--red)' },
  { icon: '👮', label: 'Police', key: 'p', color: 'var(--blue)' },
  { icon: '🚑', label: 'Ambulance', key: 'a', color: 'var(--emerald)' },
  { icon: '🔥', label: 'Fire', key: 'fire', color: '#F97316' },
  { icon: '👶', label: 'Child Helpline', key: 'c', color: '#8B5CF6' }
];

function filterCountries(query) {
  const q = query.toLowerCase();
  return COUNTRIES.filter(c => c.n.toLowerCase().includes(q));
}

function getCountryByName(name) {
  return COUNTRIES.find(c => c.n.toLowerCase() === name.toLowerCase());
}

function triggerSOS() {
  showToast('🆘 Getting your location...', 'warning');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude.toFixed(4);
        const lng = pos.coords.longitude.toFixed(4);
        showToast(`🆘 SOS ACTIVE! Location: ${lat}, ${lng} — Calling emergency...`, 'danger');
        setTimeout(() => { window.location.href = 'tel:112'; }, 2500);
      },
      () => {
        showToast('🆘 Location unavailable — Calling 112...', 'danger');
        setTimeout(() => { window.location.href = 'tel:112'; }, 1500);
      }
    );
  } else {
    window.location.href = 'tel:112';
  }
}
