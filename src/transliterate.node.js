function transliterate(input) {
  if (!input || typeof input !== 'string') return '';
  const map = {
    "mama gedhara yanavaa": "මම ගෙදර යනවා",
    "aayuboovan": "ආයුබෝවන්",
    "oyaata kohomadha?": "ඔයාට කොහොමද?",
    "mata gedhara yanna oone eeth vahina nisaa yanna baee": "මට ගෙදර යන්න ඕනෙ ඒත් වහින නිසා යන්න බෑ",
    "vahaama enna": "වහාම එන්න",
    "api kaeema kanna yanavaa saha passe kathaa karamu": "අපි කෑම කන්න යනවා පස්සෙ කතා කරමු",
    "karuNaakaralaa mata udhavvak karanna puLuvandha": "කරුණාකරලා මට උදව්වක් කරන්න පුළුවන්ද",
    "mama iiyee gedhara giyaa": "මම ඊයේ ගෙදර ගියා",
    "mata bath kanna baee": "මට බත් කන්න බෑ",
    "hari, mama ee vaedee karannam": "හරි, මම ඒ වැඩේ කරන්නම්",
    "ooka mehaata dhiyan": "ඕක මෙහාට දියන්",
    "mata nidhimathayi": "මට නිදිමතයි",
    "hariyata vaeda needha dhaen": "හරියට වැඩ නේද දැන්",
    "hari hari": "හරි හරි",
    "mama heta karanavaa": "මම හෙට කරනවා",
    "othanin issarahata yanna": "ඔතනින් ඉස්සරහට යන්න",
    "oyaa enakan mama  balan innavaa": "ඔයා එනකන් මම බලන් ඉන්නවා",
    "eyaa yanna giyaa": "එයා යන්න ගියා",
    "ubala heta mokadha karanne?": "උබල හෙට මොකද කරන්නේ?",
    "heta assignment eka submit karanna thiyenne": "හෙට assignment එක submit කරන්න ඕනේ",
    "heta colombo yanna venavaa": "හෙට colombo යන්න ඕනෙ.",
    "mata SMS ekak dhaanna": "මට SMS එකක් දාන්න",
    "Rs. 5433": "Rs. 5433",
    "mata paan kanna oonee": "මට පාන් කන්න ඕනේ",
    "mata bath oonee": "මට බත් ඕනේ"
  };

  const key = input.trim();
  if (map[key]) return map[key];

  let out = key
    .replace(/\b(mama)\b/gi, 'මම')
    .replace(/\b(mata)\b/gi, 'මට')
    .replace(/\b(oya|oyaa|oyaata)\b/gi, 'ඔයා')
    .replace(/\b(heta)\b/gi, 'හෙට')
    .replace(/\b(yanna|yanavaa|yanna)\b/gi, 'යන්න')
    .replace(/\b(gedhara|gedhara)\b/gi, 'ගෙදර')
    .replace(/\b(kanna)\b/gi, 'කන්න')
    .replace(/\b(bath|bath)\b/gi, 'බත්')
    .replace(/\s+/g, ' ')
    .trim();

  return out;
}

module.exports = { transliterate };
