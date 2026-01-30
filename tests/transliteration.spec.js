import { test, expect } from '@playwright/test';
import { transliterate } from '../src/transliterate.js';

// All test cases mapped from your document
const testCases = [
  {
    id: "Pos_Fun_0001",
    name: "Convert simple daily sentence",
    input: "mama gedhara yanavaa",
    expected: "මම ගෙදර යනවා",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0002",
    name: "Convert greeting word",
    input: "aayuboovan",
    expected: "ආයුබෝවන්",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0003",
    name: "Convert question sentence",
    input: "oyaata kohomadha?",
    expected: "ඔයාට කොහොමද?",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0004",
    name: "Convert compound sentence",
    input: "mata gedhara yanna oone eeth vahina nisaa yanna baee",
    expected: "මට ගෙදර යන්න ඕනෙ ඒත් වහින නිසා යන්න බෑ",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0005",
    name: "Convert command sentence",
    input: "vahaama enna",
    expected: "වහාම එන්න",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0006",
    name: "Convert compound sentence",
    input: "api kaeema kanna yanavaa saha passe kathaa karamu",
    expected: "අපි කෑම කන්න යනවා පස්සෙ කතා කරමු",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0007",
    name: "Convert polite request",
    input: "karuNaakaralaa mata udhavvak karanna puLuvandha",
    expected: "කරුණාකරලා මට උදව්වක් කරන්න පුළුවන්ද",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0008",
    name: "Convert past tense sentence",
    input: "mama iiyee gedhara giyaa",
    expected: "මම ඊයේ ගෙදර ගියා",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0009",
    name: "Convert negative meaning sentence",
    input: "mata bath kanna baee",
    expected: "මට බත් කන්න බෑ",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0010",
    name: "Convert response sentence",
    input: "hari, mama ee vaedee karannam",
    expected: "හරි, මම ඒ වැඩේ කරන්නම්",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0011",
    name: "Convert informal phrasing",
    input: "ooka mehaata dhiyan",
    expected: "ඕක මෙහාට දියන්",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0012",
    name: "Convert day to day expression",
    input: "mata nidhimathayi",
    expected: "මට නිදිමතයි",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0013",
    name: "Convert phrase pattern",
    input: "hariyata vaeda needha dhaen",
    expected: "හරියට වැඩ නේද දැන්",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0014",
    name: "Convert repeated word emphasis",
    input: "hari hari",
    expected: "හරි හරි",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0015",
    name: "Convert future tense",
    input: "mama heta karanavaa",
    expected: "මම හෙට කරනවා",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0016",
    name: "Convert imperative sentence",
    input: "othanin issarahata yanna",
    expected: "ඔතනින් ඉස්සරහට යන්න",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0017",
    name: "Convert complex sentence",
    input: "oyaa enakan mama  balan innavaa",
    expected: "ඔයා එනකන් මම බලන් ඉන්නවා",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0018",
    name: "Convert pronoun variation sentence",
    input: "eyaa yanna giyaa",
    expected: "එයා යන්න ගියා",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0019",
    name: "Convert plural form sentence",
    input: "ubala heta mokadha karanne?",
    expected: "උබල හෙට මොකද කරන්නේ?",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0020",
    name: "Convert mixed singlish + English sentence",
    input: "heta assignment eka submit karanna thiyenne",
    expected: "හෙට assignment එක submit කරන්න ඕනේ",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0021",
    name: "Convert place name sentence",
    input: "heta colombo yanna venavaa",
    expected: "හෙට colombo යන්න ඕනෙ.",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0022",
    name: "Convert abbreviation sentence",
    input: "mata SMS ekak dhaanna",
    expected: "මට SMS එකක් දාන්න",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0023",
    name: "Convert currency type sentence",
    input: "Rs. 5433",
    expected: "Rs. 5433",
    status: "Pass"
  },
  {
    id: "Pos_Fun_0024",
    name: "Convert daily usage request sentence",
    input: "mata paan kanna oonee",
    expected: "මට පාන් කන්න ඕනේ",
    status: "Pass"
  },
  {
    id: "Neg_Fun_0001",
    name: "Convert missing spaces sentence",
    input: "mamagedharayanavaa",
    expected: "මම ගෙදර යනවා",
    status: "Fail"
  },
  {
    id: "Neg_Fun_0002",
    name: "Convert typographical error handling sentence",
    input: "mata bath oonea",
    expected: "මට බත් ඕනේ",
    status: "Fail"
  },
  {
    id: "Neg_Fun_0003",
    name: "Convert incorrect output due to missing spaces",
    input: "mamage dharayanavaa",
    expected: "මම ගෙදර යනවා",
    status: "Fail"
  },
  {
    id: "Neg_Fun_0004",
    name: "Incorrect output due to excessive character repetition",
    input: "yanavaaaa",
    expected: "යනවා",
    status: "Fail"
  },
  {
    id: "Neg_Fun_0005",
    name: "Incorrect output for meaningless symbols",
    input: "<<&&&",
    expected: "Meaningful sinhala word",
    status: "Fail"
  },
  {
    id: "Neg_Fun_0006",
    name: "Incorrect handling of numeric values inside sentence",
    input: "mama 212321 gedhara yanavaa",
    expected: "මම  ගෙදර යනවා",
    status: "Fail"
  },
  {
    id: "Neg_Fun_0007",
    name: "Simple sentence (slang/informal language)",
    input: "ela machan! supiri !!",
    expected: "එල මචන්  සුපිරි",
    status: "Fail"
  },
  {
    id: "Neg_Fun_0008",
    name: "Convert mixed abbreviation sentence",
    input: "mata bath oonee ASAP",
    expected: "මට බත් ඕනේ",
    status: "Fail"
  },
  {
    id: "Neg_Fun_0009",
    name: "Convert English word embedded sentence",
    input: "mama office yanna traffic jam nisaa",
    expected: "not clear in sinhala",
    status: "Fail"
  },
  {
    id: "Neg_Fun_0010",
    name: "Convert technical term sentence",
    input: "mata WIFI ekak connect karanna",
    expected: "මට WIFI එකක් connect කරන්න",
    status: "Fail"
  },
  {
    id: "Pos_UI_001",
    name: "UI behavior (real-time transliteration)",
    input: "mata bath oonee",
    expected: "මට බත් ඕනේ",
    status: "Pass"
  }
];

// Playwright test runner
test.describe('Sinhala Transliteration Test Suite', () => {
  for (const tc of testCases) {
    test(`${tc.id} - ${tc.name}`, async () => {
      const actualOutput = transliterate(tc.input || '');
      expect(actualOutput?.trim()).toBe((tc.expected || '').trim());
    });
  }
});
