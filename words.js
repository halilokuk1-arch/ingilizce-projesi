// 6. Sınıf Seviyesi İngilizce Kelime Veritabanı
const WORD_DB = [
  // === KOLAY (diff:1) ===
  {word:"apple",tr:"elma",def:"A round fruit, red or green",defTr:"Yuvarlak, kırmızı veya yeşil bir meyve",pos:"isim",syn:["fruit"],ant:[],cat:"yiyecek",diff:1,ex:"I eat an ___ every day.",exTr:"Her gün bir ___ yerim."},
  {word:"book",tr:"kitap",def:"Pages with words to read",defTr:"Okunacak sayfaları olan nesne",pos:"isim",syn:["novel","text"],ant:[],cat:"okul",diff:1,ex:"She reads a ___ before bed.",exTr:"Yatmadan önce bir ___ okur."},
  {word:"cat",tr:"kedi",def:"A small furry pet animal",defTr:"Küçük tüylü evcil hayvan",pos:"isim",syn:["kitten","feline"],ant:["dog"],cat:"hayvan",diff:1,ex:"The ___ is sleeping on the sofa.",exTr:"___ kanepede uyuyor."},
  {word:"dog",tr:"köpek",def:"A loyal pet animal that barks",defTr:"Havlayan sadık evcil hayvan",pos:"isim",syn:["puppy","hound"],ant:["cat"],cat:"hayvan",diff:1,ex:"My ___ loves to play in the park.",exTr:"___ parkta oynamayı sever."},
  {word:"eat",tr:"yemek",def:"To put food in your mouth and swallow",defTr:"Ağzına yiyecek koyup yutmak",pos:"fiil",syn:["consume","have"],ant:["starve"],cat:"eylem",diff:1,ex:"I ___ breakfast at 8 o'clock.",exTr:"Saat 8'de kahvaltı ___.",},
  {word:"big",tr:"büyük",def:"Large in size",defTr:"Boyut olarak iri",pos:"sıfat",syn:["large","huge"],ant:["small","tiny"],cat:"boyut",diff:1,ex:"The elephant is very ___.",exTr:"Fil çok ___."},
  {word:"small",tr:"küçük",def:"Little in size",defTr:"Boyut olarak ufak",pos:"sıfat",syn:["tiny","little"],ant:["big","large"],cat:"boyut",diff:1,ex:"A mouse is a ___ animal.",exTr:"Fare ___ bir hayvandır."},
  {word:"happy",tr:"mutlu",def:"Feeling good and pleased",defTr:"İyi ve memnun hissetmek",pos:"sıfat",syn:["glad","joyful"],ant:["sad","unhappy"],cat:"duygu",diff:1,ex:"She is ___ because it's her birthday.",exTr:"Doğum günü olduğu için ___."},
  {word:"sad",tr:"üzgün",def:"Feeling unhappy",defTr:"Mutsuz hissetmek",pos:"sıfat",syn:["unhappy","upset"],ant:["happy","glad"],cat:"duygu",diff:1,ex:"He was ___ when his friend left.",exTr:"Arkadaşı gidince ___ oldu."},
  {word:"run",tr:"koşmak",def:"To move quickly on foot",defTr:"Ayaklarla hızlı hareket etmek",pos:"fiil",syn:["sprint","jog"],ant:["walk","stop"],cat:"eylem",diff:1,ex:"I ___ to school every morning.",exTr:"Her sabah okula ___." },
  {word:"water",tr:"su",def:"A clear liquid we drink",defTr:"İçtiğimiz berrak sıvı",pos:"isim",syn:["liquid"],ant:[],cat:"doğa",diff:1,ex:"Please give me a glass of ___.",exTr:"Lütfen bana bir bardak ___ ver."},
  {word:"sun",tr:"güneş",def:"The bright star in the sky during day",defTr:"Gündüz gökyüzündeki parlak yıldız",pos:"isim",syn:["star"],ant:["moon"],cat:"doğa",diff:1,ex:"The ___ is shining brightly today.",exTr:"Bugün ___ parlak parlak parlıyor."},
  {word:"moon",tr:"ay",def:"The round object in the night sky",defTr:"Gece gökyüzündeki yuvarlak cisim",pos:"isim",syn:[],ant:["sun"],cat:"doğa",diff:1,ex:"The ___ is full tonight.",exTr:"Bu gece ___ dolunay."},
  {word:"house",tr:"ev",def:"A building where people live",defTr:"İnsanların yaşadığı bina",pos:"isim",syn:["home","residence"],ant:[],cat:"yer",diff:1,ex:"We live in a big ___.",exTr:"Büyük bir ___'de yaşıyoruz."},
  {word:"school",tr:"okul",def:"A place where children learn",defTr:"Çocukların öğrendiği yer",pos:"isim",syn:["academy"],ant:[],cat:"yer",diff:1,ex:"I go to ___ by bus.",exTr:"Otobüsle ___'a giderim."},
  {word:"friend",tr:"arkadaş",def:"A person you like and trust",defTr:"Sevdiğin ve güvendiğin kişi",pos:"isim",syn:["buddy","pal"],ant:["enemy"],cat:"insan",diff:1,ex:"She is my best ___.",exTr:"O benim en iyi ___ım."},
  {word:"play",tr:"oynamak",def:"To have fun, do a game",defTr:"Eğlenmek, oyun oynamak",pos:"fiil",syn:["have fun"],ant:["work"],cat:"eylem",diff:1,ex:"Children love to ___ outside.",exTr:"Çocuklar dışarıda ___mayı sever."},
  {word:"red",tr:"kırmızı",def:"The color of blood or a tomato",defTr:"Kan veya domatesin rengi",pos:"sıfat",syn:["crimson"],ant:[],cat:"renk",diff:1,ex:"She has a ___ dress.",exTr:"___ bir elbisesi var."},
  {word:"blue",tr:"mavi",def:"The color of the sky",defTr:"Gökyüzünün rengi",pos:"sıfat",syn:["azure"],ant:[],cat:"renk",diff:1,ex:"The sky is ___.",exTr:"Gökyüzü ___."},
  {word:"cold",tr:"soğuk",def:"Having a low temperature",defTr:"Düşük sıcaklığa sahip",pos:"sıfat",syn:["chilly","cool"],ant:["hot","warm"],cat:"hava",diff:1,ex:"It is very ___ in winter.",exTr:"Kışın çok ___ olur."},

  // === ORTA (diff:2) ===
  {word:"beautiful",tr:"güzel",def:"Very pleasant to look at",defTr:"Bakmaktan zevk alınan",pos:"sıfat",syn:["pretty","lovely"],ant:["ugly"],cat:"görünüş",diff:2,ex:"The garden is ___.",exTr:"Bahçe çok ___."},
  {word:"because",tr:"çünkü",def:"For the reason that",defTr:"Sebebi ... olduğu için",pos:"bağlaç",syn:["since"],ant:[],cat:"bağlaç",diff:2,ex:"I'm happy ___ I got an A.",exTr:"Mutluyum ___ A aldım."},
  {word:"different",tr:"farklı",def:"Not the same as another",defTr:"Bir diğerinden aynı olmayan",pos:"sıfat",syn:["unlike","distinct"],ant:["same","similar"],cat:"karşılaştırma",diff:2,ex:"These two shoes are ___.",exTr:"Bu iki ayakkabı ___."},
  {word:"important",tr:"önemli",def:"Having great value or meaning",defTr:"Büyük değeri veya anlamı olan",pos:"sıfat",syn:["significant","vital"],ant:["unimportant"],cat:"değer",diff:2,ex:"This exam is very ___.",exTr:"Bu sınav çok ___."},
  {word:"between",tr:"arasında",def:"In the space separating two things",defTr:"İki şeyi ayıran boşlukta",pos:"edat",syn:["among"],ant:[],cat:"konum",diff:2,ex:"The park is ___ the school and the hospital.",exTr:"Park okul ile hastane ___dır."},
  {word:"always",tr:"her zaman",def:"At all times, every time",defTr:"Her zaman, sürekli",pos:"zarf",syn:["forever","constantly"],ant:["never"],cat:"zaman",diff:2,ex:"She ___ does her homework.",exTr:"___ ödevini yapar."},
  {word:"never",tr:"asla/hiçbir zaman",def:"Not at any time",defTr:"Hiçbir zaman olmamak",pos:"zarf",syn:["not ever"],ant:["always"],cat:"zaman",diff:2,ex:"I ___ eat fish.",exTr:"___ balık yemem."},
  {word:"family",tr:"aile",def:"Parents and their children",defTr:"Anne-baba ve çocukları",pos:"isim",syn:["relatives"],ant:[],cat:"insan",diff:2,ex:"My ___ has five members.",exTr:"Benim ___m beş kişi."},
  {word:"teacher",tr:"öğretmen",def:"A person who teaches at school",defTr:"Okulda ders veren kişi",pos:"isim",syn:["instructor","educator"],ant:["student"],cat:"meslek",diff:2,ex:"Our ___ is very kind.",exTr:"___imiz çok iyi."},
  {word:"student",tr:"öğrenci",def:"A person who studies at school",defTr:"Okulda okuyan kişi",pos:"isim",syn:["pupil","learner"],ant:["teacher"],cat:"meslek",diff:2,ex:"She is a good ___.",exTr:"İyi bir ___."},
  {word:"morning",tr:"sabah",def:"The early part of the day",defTr:"Günün erken saatleri",pos:"isim",syn:["dawn","sunrise"],ant:["evening","night"],cat:"zaman",diff:2,ex:"I wake up early in the ___.",exTr:"___ları erken kalkarım."},
  {word:"evening",tr:"akşam",def:"The later part of the day before night",defTr:"Geceden önceki günün son kısmı",pos:"isim",syn:["dusk","twilight"],ant:["morning"],cat:"zaman",diff:2,ex:"We have dinner in the ___.",exTr:"___ları akşam yemeği yeriz."},
  {word:"hungry",tr:"aç",def:"Wanting to eat food",defTr:"Yemek yemek istemek",pos:"sıfat",syn:["starving"],ant:["full"],cat:"durum",diff:2,ex:"I am very ___.",exTr:"Çok ___ım."},
  {word:"thirsty",tr:"susuz/susamış",def:"Wanting to drink something",defTr:"Bir şey içmek istemek",pos:"sıfat",syn:["parched"],ant:[],cat:"durum",diff:2,ex:"After running, I feel ___.",exTr:"Koştuktan sonra ___ hissederim."},
  {word:"weather",tr:"hava durumu",def:"The condition of the atmosphere",defTr:"Atmosferin durumu",pos:"isim",syn:["climate"],ant:[],cat:"doğa",diff:2,ex:"The ___ is nice today.",exTr:"Bugün ___ güzel."},
  {word:"together",tr:"birlikte",def:"With each other, as a group",defTr:"Birbiriyle, grup olarak",pos:"zarf",syn:["jointly"],ant:["alone","separately"],cat:"durum",diff:2,ex:"Let's play ___!",exTr:"Hadi ___ oynayalım!"},
  {word:"answer",tr:"cevap/yanıt",def:"A response to a question",defTr:"Bir soruya verilen karşılık",pos:"isim",syn:["reply","response"],ant:["question"],cat:"iletişim",diff:2,ex:"Do you know the ___?",exTr:"___ı biliyor musun?"},
  {word:"question",tr:"soru",def:"Something you ask to get information",defTr:"Bilgi almak için sorulan şey",pos:"isim",syn:["inquiry"],ant:["answer"],cat:"iletişim",diff:2,ex:"Can I ask you a ___?",exTr:"Sana bir ___ sorabilir miyim?"},
  {word:"listen",tr:"dinlemek",def:"To pay attention to sounds",defTr:"Seslere dikkat etmek",pos:"fiil",syn:["hear"],ant:["ignore"],cat:"eylem",diff:2,ex:"Please ___ to the teacher.",exTr:"Lütfen öğretmeni ___yin."},
  {word:"write",tr:"yazmak",def:"To make letters or words on paper",defTr:"Kağıda harf veya kelime çizmek",pos:"fiil",syn:["compose","note"],ant:["erase"],cat:"eylem",diff:2,ex:"___ your name on the paper.",exTr:"Kağıda adını ___."},

  // === ZOR (diff:3) ===
  {word:"adventure",tr:"macera",def:"An exciting and unusual experience",defTr:"Heyecanlı ve alışılmadık deneyim",pos:"isim",syn:["journey","quest"],ant:["boredom"],cat:"deneyim",diff:3,ex:"The book tells an exciting ___.",exTr:"Kitap heyecanlı bir ___ anlatıyor."},
  {word:"celebrate",tr:"kutlamak",def:"To do something special for an occasion",defTr:"Bir vesile için özel bir şey yapmak",pos:"fiil",syn:["honor","rejoice"],ant:["mourn"],cat:"eylem",diff:3,ex:"We ___ birthdays with cake.",exTr:"Doğum günlerini pastayla ___rız."},
  {word:"describe",tr:"tanımlamak/betimlemek",def:"To tell what something is like",defTr:"Bir şeyin nasıl olduğunu anlatmak",pos:"fiil",syn:["explain","illustrate"],ant:[],cat:"iletişim",diff:3,ex:"Can you ___ your house?",exTr:"Evini ___yabilir misin?"},
  {word:"difficult",tr:"zor",def:"Not easy to do or understand",defTr:"Yapması veya anlaması kolay olmayan",pos:"sıfat",syn:["hard","tough"],ant:["easy","simple"],cat:"zorluk",diff:3,ex:"This math problem is very ___.",exTr:"Bu matematik sorusu çok ___."},
  {word:"exercise",tr:"egzersiz",def:"Physical activity to stay healthy",defTr:"Sağlıklı kalmak için fiziksel aktivite",pos:"isim",syn:["workout","training"],ant:["rest"],cat:"sağlık",diff:3,ex:"You should ___ every day.",exTr:"Her gün ___ yapmalısın."},
  {word:"favorite",tr:"favori/en sevilen",def:"The one you like the most",defTr:"En çok sevdiğin şey",pos:"sıfat",syn:["preferred","beloved"],ant:["least liked"],cat:"tercih",diff:3,ex:"What is your ___ color?",exTr:"___ rengin ne?"},
  {word:"imagine",tr:"hayal etmek",def:"To form a picture in your mind",defTr:"Zihninde bir resim oluşturmak",pos:"fiil",syn:["dream","picture"],ant:[],cat:"zihin",diff:3,ex:"___ you are on the moon!",exTr:"Ayda olduğunu ___ et!"},
  {word:"knowledge",tr:"bilgi",def:"Facts and information that you know",defTr:"Bildiğin gerçekler ve bilgiler",pos:"isim",syn:["wisdom","learning"],ant:["ignorance"],cat:"zihin",diff:3,ex:"Reading increases your ___.",exTr:"Okumak ___ni artırır."},
  {word:"language",tr:"dil",def:"A system of words people use to communicate",defTr:"İnsanların iletişim kurmak için kullandığı kelime sistemi",pos:"isim",syn:["tongue","speech"],ant:[],cat:"iletişim",diff:3,ex:"English is a global ___.",exTr:"İngilizce küresel bir ___dir."},
  {word:"mountain",tr:"dağ",def:"A very high area of land",defTr:"Çok yüksek kara parçası",pos:"isim",syn:["peak","summit"],ant:["valley"],cat:"doğa",diff:3,ex:"We climbed the ___ last summer.",exTr:"Geçen yaz ___a tırmandık."},
  {word:"dangerous",tr:"tehlikeli",def:"Likely to cause harm or injury",defTr:"Zarar veya yaralanmaya yol açması muhtemel",pos:"sıfat",syn:["risky","hazardous"],ant:["safe","secure"],cat:"durum",diff:3,ex:"Swimming alone can be ___.",exTr:"Tek başına yüzmek ___ olabilir."},
  {word:"journey",tr:"yolculuk",def:"Traveling from one place to another",defTr:"Bir yerden başka bir yere seyahat etmek",pos:"isim",syn:["trip","voyage"],ant:["stay"],cat:"seyahat",diff:3,ex:"The ___ took five hours.",exTr:"___ beş saat sürdü."},
  {word:"discover",tr:"keşfetmek",def:"To find something for the first time",defTr:"Bir şeyi ilk kez bulmak",pos:"fiil",syn:["find","uncover"],ant:["miss","overlook"],cat:"eylem",diff:3,ex:"Scientists ___ new things every day.",exTr:"Bilim insanları her gün yeni şeyler ___eder."},
  {word:"remember",tr:"hatırlamak",def:"To keep something in your memory",defTr:"Bir şeyi hafızanda tutmak",pos:"fiil",syn:["recall","recollect"],ant:["forget"],cat:"zihin",diff:3,ex:"I ___ my first day at school.",exTr:"Okuldaki ilk günümü ___ıyorum."},
  {word:"practice",tr:"pratik yapmak",def:"To do something again and again to improve",defTr:"Gelişmek için bir şeyi tekrar tekrar yapmak",pos:"fiil",syn:["rehearse","train"],ant:["neglect"],cat:"eylem",diff:3,ex:"You need to ___ English every day.",exTr:"Her gün İngilizce ___ yapmalısın."},
  {word:"popular",tr:"popüler",def:"Liked by many people",defTr:"Birçok kişi tarafından sevilen",pos:"sıfat",syn:["famous","well-known"],ant:["unpopular","unknown"],cat:"durum",diff:3,ex:"This song is very ___.",exTr:"Bu şarkı çok ___."},
  {word:"polite",tr:"kibar/nazik",def:"Having good manners, respectful",defTr:"İyi davranışlı, saygılı",pos:"sıfat",syn:["courteous","respectful"],ant:["rude","impolite"],cat:"davranış",diff:3,ex:"She is always ___ to everyone.",exTr:"Herkese karşı her zaman ___dir."},
  {word:"environment",tr:"çevre",def:"The natural world around us",defTr:"Etrafımızdaki doğal dünya",pos:"isim",syn:["nature","surroundings"],ant:[],cat:"doğa",diff:3,ex:"We must protect our ___.",exTr:"___mizi korumalıyız."},
  {word:"successful",tr:"başarılı",def:"Achieving what you wanted",defTr:"İstediğini başaran",pos:"sıfat",syn:["triumphant","winning"],ant:["unsuccessful","failed"],cat:"durum",diff:3,ex:"She is a ___ student.",exTr:"O ___ bir öğrenci."},
  {word:"comfortable",tr:"rahat",def:"Giving physical ease and relaxation",defTr:"Fiziksel kolaylık ve rahatlık veren",pos:"sıfat",syn:["cozy","pleasant"],ant:["uncomfortable"],cat:"durum",diff:3,ex:"This chair is very ___.",exTr:"Bu sandalye çok ___."},
];

const SENTENCES = WORD_DB.map(w=>({word:w.word,sentence:w.ex,sentenceTr:w.exTr,def:w.def,defTr:w.defTr,tr:w.tr,diff:w.diff}));

const WORD_LADDERS = [
  {start:"CAT",end:"DOG",steps:["CAT","COT","COG","DOG"]},
  {start:"BIG",end:"SAD",steps:["BIG","BAG","BAD","SAD"]},
  {start:"HOT",end:"ICE",steps:["HOT","HIT","HID","AID","ACE","ICE"]},
  {start:"RUN",end:"SIT",steps:["RUN","SUN","SIN","SIT"]},
  {start:"RED",end:"BIG",steps:["RED","BED","BIG"]},
];

const CROSSWORDS = [
  {size:5,grid:[['H','A','P','P','Y'],['O','#','#','#','#'],['U','#','C','#','R'],['S','#','A','#','U'],['E','A','T','#','N']],
   across:[{row:0,col:0,clue:"Mutlu",answer:"HAPPY",num:1},{row:4,col:0,clue:"Yemek yemek",answer:"EAT",num:5}],
   down:[{row:0,col:0,clue:"Ev",answer:"HOUSE",num:1},{row:0,col:4,clue:"Koşmak",answer:"RUN",num:2},{row:2,col:2,clue:"Kedi",answer:"CAT",num:3}]},
  {size:5,grid:[['W','A','T','E','R'],['#','#','#','#','E'],['S','M','A','L','L'],['#','#','#','#','U'],['B','L','U','E','#']],
   across:[{row:0,col:0,clue:"Su",answer:"WATER",num:1},{row:2,col:0,clue:"Küçük",answer:"SMALL",num:3},{row:4,col:0,clue:"Mavi",answer:"BLUE",num:5}],
   down:[{row:0,col:4,clue:"Okumak",answer:"READ",num:2}]},
];

function getWordsByDifficulty(d){return WORD_DB.filter(w=>w.diff===d);}
function getRandomWord(d){const ws=d?getWordsByDifficulty(d):WORD_DB;return ws[Math.floor(Math.random()*ws.length)];}
function getRandomWords(n,d){const p=d?getWordsByDifficulty(d):[...WORD_DB];return shuffleArray(p).slice(0,Math.min(n,p.length));}
function shuffleArray(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
