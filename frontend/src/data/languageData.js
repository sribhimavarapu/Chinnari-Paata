// Telugu Language Data - Modular structure for future language support

export const LANGUAGES = {
  telugu: {
    code: 'te-IN',
    name: 'తెలుగు',
    englishName: 'Telugu'
  }
};

export const TELUGU_VOWELS = [
  { letter: 'అ', transliteration: 'a', example: 'అమ్మ', exampleMeaning: 'Mother', exampleImage: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?w=400' },
  { letter: 'ఆ', transliteration: 'aa', example: 'ఆపిల్', exampleMeaning: 'Apple', exampleImage: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?w=400' },
  { letter: 'ఇ', transliteration: 'i', example: 'ఇల్లు', exampleMeaning: 'House', exampleImage: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=400' },
  { letter: 'ఈ', transliteration: 'ee', example: 'ఈగ', exampleMeaning: 'Fly', exampleImage: 'https://images.pexels.com/photos/36738/fly-compound-eyes-enlarged-macro.jpg?w=400' },
  { letter: 'ఉ', transliteration: 'u', example: 'ఉంగరం', exampleMeaning: 'Ring', exampleImage: 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?w=400' },
  { letter: 'ఊ', transliteration: 'oo', example: 'ఊయల', exampleMeaning: 'Swing', exampleImage: 'https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg?w=400' },
  { letter: 'ఋ', transliteration: 'ru', example: 'ఋషి', exampleMeaning: 'Sage', exampleImage: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?w=400' },
  { letter: 'ఎ', transliteration: 'e', example: 'ఎలుక', exampleMeaning: 'Mouse', exampleImage: 'https://images.pexels.com/photos/51340/rat-rodent-animal-cute-51340.jpeg?w=400' },
  { letter: 'ఏ', transliteration: 'ae', example: 'ఏనుగు', exampleMeaning: 'Elephant', exampleImage: 'https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg?w=400' },
  { letter: 'ఐ', transliteration: 'ai', example: 'ఐస్', exampleMeaning: 'Ice', exampleImage: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?w=400' },
  { letter: 'ఒ', transliteration: 'o', example: 'ఒంటె', exampleMeaning: 'Camel', exampleImage: 'https://images.pexels.com/photos/2080840/pexels-photo-2080840.jpeg?w=400' },
  { letter: 'ఓ', transliteration: 'oe', example: 'ఓడ', exampleMeaning: 'Boat', exampleImage: 'https://images.pexels.com/photos/273886/pexels-photo-273886.jpeg?w=400' },
  { letter: 'ఔ', transliteration: 'au', example: 'ఔషధం', exampleMeaning: 'Medicine', exampleImage: 'https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg?w=400' },
  { letter: 'అం', transliteration: 'am', example: 'అంగడి', exampleMeaning: 'Shop', exampleImage: 'https://images.pexels.com/photos/1528010/pexels-photo-1528010.jpeg?w=400' },
  { letter: 'అః', transliteration: 'ah', example: 'దుఃఖం', exampleMeaning: 'Sadness', exampleImage: 'https://images.pexels.com/photos/568025/pexels-photo-568025.jpeg?w=400' }
];

export const WORD_CATEGORIES = {
  animals: {
    name: 'జంతువులు',
    englishName: 'Animals',
    icon: '🦁',
    color: '#FF6B6B',
    image: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?w=800',
    words: [
      { telugu: 'కుక్క', english: 'Dog', image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?w=400' },
      { telugu: 'పిల్లి', english: 'Cat', image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?w=400' },
      { telugu: 'ఏనుగు', english: 'Elephant', image: 'https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg?w=400' },
      { telugu: 'సింహం', english: 'Lion', image: 'https://images.pexels.com/photos/68421/pexels-photo-68421.jpeg?w=400' },
      { telugu: 'కోతి', english: 'Monkey', image: 'https://images.pexels.com/photos/3220283/pexels-photo-3220283.jpeg?w=400' },
      { telugu: 'పావురం', english: 'Pigeon', image: 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?w=400' },
      { telugu: 'చేప', english: 'Fish', image: 'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?w=400' },
      { telugu: 'ఆవు', english: 'Cow', image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?w=400' }
    ]
  },
  fruits: {
    name: 'పండ్లు',
    englishName: 'Fruits',
    icon: '🍎',
    color: '#FFD93D',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?w=800',
    words: [
      { telugu: 'మామిడి', english: 'Mango', image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?w=400' },
      { telugu: 'అరటి', english: 'Banana', image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?w=400' },
      { telugu: 'ఆపిల్', english: 'Apple', image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?w=400' },
      { telugu: 'ద్రాక్ష', english: 'Grapes', image: 'https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?w=400' },
      { telugu: 'పుచ్చకాయ', english: 'Watermelon', image: 'https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?w=400' },
      { telugu: 'నారింజ', english: 'Orange', image: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?w=400' },
      { telugu: 'బొప్పాయి', english: 'Papaya', image: 'https://images.pexels.com/photos/1111624/pexels-photo-1111624.jpeg?w=400' },
      { telugu: 'దానిమ్మ', english: 'Pomegranate', image: 'https://images.pexels.com/photos/65256/pomegranate-open-cores-fruit-65256.jpeg?w=400' }
    ]
  },
  colors: {
    name: 'రంగులు',
    englishName: 'Colors',
    icon: '🎨',
    color: '#4D96FF',
    image: 'https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?w=800',
    words: [
      { telugu: 'ఎరుపు', english: 'Red', bgColor: '#FF6B6B' },
      { telugu: 'నీలం', english: 'Blue', bgColor: '#4D96FF' },
      { telugu: 'పసుపు', english: 'Yellow', bgColor: '#FFD93D' },
      { telugu: 'ఆకుపచ్చ', english: 'Green', bgColor: '#6BCB77' },
      { telugu: 'నారింజ', english: 'Orange', bgColor: '#FF9F45' },
      { telugu: 'ఊదా', english: 'Purple', bgColor: '#9B59B6' },
      { telugu: 'గులాబీ', english: 'Pink', bgColor: '#FF6B9D' },
      { telugu: 'తెలుపు', english: 'White', bgColor: '#F5F5F5' }
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
    id: 'sW7YVzuLe3c', 
    title: 'చందమామ రావే', 
    englishTitle: 'Chandamama Rave',
    thumbnail: 'https://img.youtube.com/vi/sW7YVzuLe3c/mqdefault.jpg'
  },
  { 
    id: 'VlPrUHjPdKI', 
    title: 'కొత్త కొత్త బొమ్మ', 
    englishTitle: 'New Doll Song',
    thumbnail: 'https://img.youtube.com/vi/VlPrUHjPdKI/mqdefault.jpg'
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
