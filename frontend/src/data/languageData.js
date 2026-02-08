// Telugu Language Data - Modular structure for future language support

export const LANGUAGES = {
  telugu: {
    code: 'te-IN',
    name: 'తెలుగు',
    englishName: 'Telugu'
  }
};

export const TELUGU_VOWELS = [
  { letter: 'అ', transliteration: 'a', example: 'అమ్మ', exampleMeaning: 'Mother', exampleImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400' },
  { letter: 'ఆ', transliteration: 'aa', example: 'ఆపిల్', exampleMeaning: 'Apple', exampleImage: 'https://images.unsplash.com/photo-1568702846914-96b305d2uj8e?w=400' },
  { letter: 'ఇ', transliteration: 'i', example: 'ఇల్లు', exampleMeaning: 'House', exampleImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400' },
  { letter: 'ఈ', transliteration: 'ee', example: 'ఈగ', exampleMeaning: 'Fly', exampleImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400' },
  { letter: 'ఉ', transliteration: 'u', example: 'ఉంగరం', exampleMeaning: 'Ring', exampleImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400' },
  { letter: 'ఊ', transliteration: 'oo', example: 'ఊయల', exampleMeaning: 'Swing', exampleImage: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=400' },
  { letter: 'ఋ', transliteration: 'ru', example: 'ఋషి', exampleMeaning: 'Sage', exampleImage: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400' },
  { letter: 'ఎ', transliteration: 'e', example: 'ఎలుక', exampleMeaning: 'Mouse', exampleImage: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400' },
  { letter: 'ఏ', transliteration: 'ae', example: 'ఏనుగు', exampleMeaning: 'Elephant', exampleImage: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400' },
  { letter: 'ఐ', transliteration: 'ai', example: 'ఐస్', exampleMeaning: 'Ice', exampleImage: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400' },
  { letter: 'ఒ', transliteration: 'o', example: 'ఒంటె', exampleMeaning: 'Camel', exampleImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400' },
  { letter: 'ఓ', transliteration: 'oe', example: 'ఓడ', exampleMeaning: 'Boat', exampleImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400' },
  { letter: 'ఔ', transliteration: 'au', example: 'ఔషధం', exampleMeaning: 'Medicine', exampleImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
  { letter: 'అం', transliteration: 'am', example: 'అంగడి', exampleMeaning: 'Shop', exampleImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400' },
  { letter: 'అః', transliteration: 'ah', example: 'దుఃఖం', exampleMeaning: 'Sadness', exampleImage: 'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=400' }
];

export const WORD_CATEGORIES = {
  animals: {
    name: 'జంతువులు',
    englishName: 'Animals',
    icon: '🦁',
    color: '#FF6B6B',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800',
    words: [
      { telugu: 'కుక్క', english: 'Dog', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' },
      { telugu: 'పిల్లి', english: 'Cat', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400' },
      { telugu: 'ఏనుగు', english: 'Elephant', image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400' },
      { telugu: 'సింహం', english: 'Lion', image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400' },
      { telugu: 'కోతి', english: 'Monkey', image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400' },
      { telugu: 'పావురం', english: 'Pigeon', image: 'https://images.unsplash.com/photo-1555169062-013468b47731?w=400' },
      { telugu: 'చేప', english: 'Fish', image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=400' },
      { telugu: 'ఆవు', english: 'Cow', image: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=400' }
    ]
  },
  fruits: {
    name: 'పండ్లు',
    englishName: 'Fruits',
    icon: '🍎',
    color: '#FFD93D',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800',
    words: [
      { telugu: 'మామిడి', english: 'Mango', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
      { telugu: 'అరటి', english: 'Banana', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
      { telugu: 'ఆపిల్', english: 'Apple', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400' },
      { telugu: 'ద్రాక్ష', english: 'Grapes', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400' },
      { telugu: 'పుచ్చకాయ', english: 'Watermelon', image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=400' },
      { telugu: 'నారింజ', english: 'Orange', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400' },
      { telugu: 'బొప్పాయి', english: 'Papaya', image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400' },
      { telugu: 'దానిమ్మ', english: 'Pomegranate', image: 'https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=400' }
    ]
  },
  colors: {
    name: 'రంగులు',
    englishName: 'Colors',
    icon: '🎨',
    color: '#4D96FF',
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800',
    words: [
      { telugu: 'ఎరుపు', english: 'Red', image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400', bgColor: '#FF6B6B' },
      { telugu: 'నీలం', english: 'Blue', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400', bgColor: '#4D96FF' },
      { telugu: 'పసుపు', english: 'Yellow', image: 'https://images.unsplash.com/photo-1520716963369-9b24de292417?w=400', bgColor: '#FFD93D' },
      { telugu: 'ఆకుపచ్చ', english: 'Green', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=400', bgColor: '#6BCB77' },
      { telugu: 'నారింజ', english: 'Orange', image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400', bgColor: '#FF9F45' },
      { telugu: 'ఊదా', english: 'Purple', image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400', bgColor: '#9B59B6' },
      { telugu: 'గులాబీ', english: 'Pink', image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400', bgColor: '#FF6B9D' },
      { telugu: 'తెలుపు', english: 'White', image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400', bgColor: '#F5F5F5' }
    ]
  }
};

export const RHYMES = [
  { 
    id: '_wFzgFmIMUs', 
    title: 'ఐదు అలూస్', 
    englishTitle: 'Five Potatoes',
    thumbnail: 'https://img.youtube.com/vi/_wFzgFmIMUs/mqdefault.jpg'
  },
  { 
    id: 'SZhTR-kowVI', 
    title: 'ఆకేసి పప్పేసి', 
    englishTitle: 'Aakesi Pappesi',
    thumbnail: 'https://img.youtube.com/vi/SZhTR-kowVI/mqdefault.jpg'
  },
  { 
    id: '0F6WRYemPRE', 
    title: 'గుండ్రాణి లడ్డు', 
    englishTitle: 'Gundrani Laddu',
    thumbnail: 'https://img.youtube.com/vi/0F6WRYemPRE/mqdefault.jpg'
  },
  { 
    id: 'nlOeOkkFDic', 
    title: 'ఏనుగమ్మా ఏనుగు', 
    englishTitle: 'Enugamma Enugu',
    thumbnail: 'https://img.youtube.com/vi/nlOeOkkFDic/mqdefault.jpg'
  },
  { 
    id: 'JMV3lM_2bA4', 
    title: 'లల్లా లల్లా లోరి', 
    englishTitle: 'Lullaby Song',
    thumbnail: 'https://img.youtube.com/vi/JMV3lM_2bA4/mqdefault.jpg'
  },
  { 
    id: 'xwXDqM2T7gs', 
    title: 'చందమామ రావే', 
    englishTitle: 'Moon Come Here',
    thumbnail: 'https://img.youtube.com/vi/xwXDqM2T7gs/mqdefault.jpg'
  }
];

export const STICKERS = [
  { id: 'star', emoji: '⭐', name: 'Star' },
  { id: 'heart', emoji: '❤️', name: 'Heart' },
  { id: 'sun', emoji: '☀️', name: 'Sun' },
  { id: 'rainbow', emoji: '🌈', name: 'Rainbow' },
  { id: 'flower', emoji: '🌸', name: 'Flower' },
  { id: 'butterfly', emoji: '🦋', name: 'Butterfly' },
  { id: 'rocket', emoji: '🚀', name: 'Rocket' },
  { id: 'crown', emoji: '👑', name: 'Crown' },
  { id: 'sparkle', emoji: '✨', name: 'Sparkle' },
  { id: 'trophy', emoji: '🏆', name: 'Trophy' }
];

export default {
  LANGUAGES,
  TELUGU_VOWELS,
  WORD_CATEGORIES,
  RHYMES,
  STICKERS
};
