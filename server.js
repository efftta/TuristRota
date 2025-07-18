const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// CORS'u etkinleştir
app.use(cors());

// Statik dosyaları sun (HTML, CSS, JS, resimler)
app.use(express.static(path.join(__dirname, 'public')));

// Turistik yer verileri
const data = {
  mosques: [
    { name: "Blue Mosque", description: "Known for its blue tiles.", image: "images/blue_mosque.jpg", lat: 41.0053, lon: 28.9769, map: "https://www.google.com/maps/place/Sultan+Ahmet+Camii" },
    { name: "Süleymaniye Mosque", description: "Ottoman architecture masterpiece.", image: "images/suleymaniye.jpg", lat: 41.0164, lon: 28.9634, map: "https://www.google.com/maps/place/S%C3%BCleymaniye+Camii" },
    { name: "Yeni Mosque", description: "Near the Spice Bazaar.", image: "images/yeni_mosque.jpg", lat: 41.0168, lon: 28.9702, map: "https://www.google.com/maps/place/Yeni+Camii" },
    { name: "Fatih Mosque", description: "Built by Sultan Mehmed II.", image: "images/fatih_mosque.jpg", lat: 41.0191, lon: 28.9507, map: "https://www.google.com/maps/place/Fatih+Camii/@41.0191158,28.9507242,17z" },
    { name: "Eyüp Sultan Mosque", description: "Spiritual site in Eyüp.", image: "images/eyup.jpg", lat: 41.0486, lon: 28.9331, map: "https://www.google.com/maps/place//@41.0486,28.9331,17z?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D" },
    { name: "Ortaköy Mosque", description: "Bosphorus view.", image: "images/ortakoy.jpg", lat: 41.0356, lon: 29.0270, map: "https://www.google.com/maps/place/Ortak%C3%B6y+Camii" },
    { name: "Rustem Pasha Mosque", description: "İznik tiles masterpiece.", image: "images/rustem.jpg", lat: 41.0151, lon: 28.9691, map: "https://www.google.com/maps/place/R%C3%BCstem+Pa%C5%9Fa+Camii" },
    { name: "Mihrimah Sultan Mosque", description: "Named after Mihrimah Sultan.", image: "images/mihrimah.jpg", lat: 41.0378, lon: 28.9601, map: "https://www.google.com/maps/place/Mihrimah+Sultan+Camii+(Edirnekap%C4%B1)" },
    { name: "Şehzade Mosque", description: "Elegant 16th-century mosque.", image: "images/sehzade.jpg", lat: 41.0122, lon: 28.9529, map: "https://www.google.com/maps/place/%C5%9Eehzade+Camii/@41.0121658,28.9528852,17z" },
    { name: "Laleli Mosque", description: "Baroque-style Ottoman mosque.", image: "images/laleli.jpg", lat: 41.0158, lon: 28.9639, map: "https://www.google.com/maps/place/Laleli+Camii" }
  ],
  historical: [
    { name: "Hagia Sophia", description: "Byzantine cathedral-turned-mosque.", image: "images/hagia_sophia.jpg", lat: 41.0085, lon: 28.9802, map: "https://www.google.com/maps/place/Ayasofya" },
    { name: "Topkapi Palace", description: "Ottoman sultans' residence.", image: "images/topkapi.jpg", lat: 41.0116, lon: 28.9850, map: "https://www.google.com/maps/place/Topkap%C4%B1+Saray%C4%B1" },
    { name: "Basilica Cistern", description: "Ancient water reservoir.", image: "images/cistern.jpg", lat: 41.0084, lon: 28.9793, map: "https://www.google.com/maps/place/Yerebatan+Sarn%C4%B1c%C4%B1" },
    { name: "Galata Tower", description: "Medieval watchtower.", image: "images/galata.jpg", lat: 41.0258, lon: 28.9744, map: "https://www.google.com/maps/place/Galata+Kulesi" },
    { name: "Rumeli Fortress", description: "Ottoman fortress on Bosphorus.", image: "images/rumeli.jpg", lat: 41.0704, lon: 29.0509, map: "https://www.google.com/maps/place/Rumeli+Hisar%C4%B1" },
    { name: "Dolmabahçe Palace", description: "Baroque and Ottoman design.", image: "images/dolmabahce.jpg", lat: 41.0365, lon: 29.0007, map: "https://www.google.com/maps/place/Dolmabah%C3%A7e+Saray%C4%B1" },
    { name: "Yedikule Fortress", description: "Byzantine-Ottoman fort.", image: "images/yedikule.jpg", lat: 40.9949, lon: 28.9279, map: "https://www.google.com/maps/place/Yedikule+Hisar%C4%B1/@40.9949382,28.9279499,17z" },
    { name: "Istanbul Walls", description: "Ancient city defense walls.", image: "images/walls.jpg", lat: 41.0167, lon: 28.9444, map: "https://www.google.com/maps/place/Istanbul+City+Walls" },
    { name: "Chora Church", description: "Famous Byzantine mosaics.", image: "images/chora.jpg", lat: 41.0325, lon: 28.9399, map: "https://www.google.com/maps/place/Kariye+Mosque/@41.0325054,28.9398623,17z" },
    { name: "Sirkeci Station", description: "Last stop of Orient Express.", image: "images/sirkeci.jpg", lat: 41.0199, lon: 28.9763, map: "https://www.google.com/maps/place/Sirkeci+Gar%C4%B1" }
  ],
  nature: [
    { name: "Belgrad Forest", description: "Popular hiking and picnic area.", image: "images/belgrad.jpg", lat: 41.2085, lon: 28.0161, map: "https://www.google.com/maps/place/Belgrad+Forest/@41.208508,28.0161245,12z" },
    { name: "Gülhane Park", description: "Historic green area.", image: "images/gulhane.jpg", lat: 41.0131, lon: 28.9823, map: "https://www.google.com/maps/place/G%C3%BClhane+Park/@41.0131224,28.9822977,17z" },
    { name: "Yıldız Park", description: "Ottoman era park.", image: "images/yildiz.jpg", lat: 41.0495, lon: 29.0134, map: "https://www.google.com/maps/place/Y%C4%B1ld%C4%B1z+Park/@41.0494533,29.0133552,17z" },
    { name: "Çamlıca Hill", description: "Panoramic Istanbul view.", image: "images/camlica.jpg", lat: 41.0245, lon: 29.0610, map: "https://www.google.com/maps/place/%C3%87aml%C4%B1ca+Hill/@41.0244641,29.0609637,17z" },
    { name: "Fenerbahçe Park", description: "Green area by the sea.", image: "images/fenerbahce.jpg", lat: 40.9751, lon: 29.0422, map: "https://www.google.com/maps/place/Fenerbah%C3%A7e+Park/@40.9751003,29.0422278,17z" },
    { name: "Emirgan Park", description: "Famous for tulips.", image: "images/emirgan.jpg", lat: 41.1096, lon: 29.0523, map: "https://www.google.com/maps/place/Emirgan+Park/@41.1095989,29.0522567,17z" },
    { name: "Moda Coast", description: "Chill area by the water.", image: "images/moda.jpg", lat: 40.9805, lon: 29.0256, map: "https://www.google.com/maps/place/Moda+Sahil+Park%C4%B1/@40.9805467,29.0256166,17z" },
    { name: "Aydos Forest", description: "Hidden forest in Istanbul.", image: "images/aydos.jpg", lat: 40.9558, lon: 29.2712, map: "https://www.google.com/maps/place/Aydos+Ormani/@40.9558135,29.2711524,14z" },
    { name: "Polonezköy Nature Park", description: "Village with natural beauty.", image: "images/polonezkoy.jpg", lat: 41.1182, lon: 29.1484, map: "https://www.google.com/maps/place/Polonezk%C3%B6y+Nature+Park/@41.1182244,29.1484025,17z" },
    { name: "Büyükada", description: "Island with no cars!", image: "images/buyukada.jpg", lat: 40.8679, lon: 29.1164, map: "https://www.google.com/maps/place/B%C3%BCy%C3%BCkada/@40.867853,29.116406,13z" }
  ],
  museums: [
    { name: "Istanbul Arch. Museum", description: "Artifacts from ancient civilizations.", image: "images/archaeology.jpg", lat: 41.0086, lon: 28.9814, map: "https://www.google.com/maps/place/Istanbul+Archaeology+Museums/@41.0085836,28.9814479,17z" },
    { name: "Rahmi Koç Museum", description: "Tech, transport, industrial heritage.", image: "images/rahmi_koc.jpg", lat: 41.0428, lon: 28.9424, map: "https://www.google.com/maps/place/Rahmi+M.+Ko%C3%A7+Museum/@41.0428222,28.9423813,17z" },
    { name: "Modern Istanbul Museum", description: "Contemporary art.", image: "images/istanbul_modern.jpg", lat: 41.0247, lon: 28.9831, map: "https://www.google.com/maps/place/Istanbul+Modern/@41.024722,28.983056,17z" },
    { name: "Pera Museum", description: "Orientalist paintings.", image: "images/pera.jpg", lat: 41.0348, lon: 28.9783, map: "https://www.google.com/maps/place/Pera+Museum/@41.0348195,28.9783301,17z" },
    { name: "Sakıp Sabancı Museum", description: "Ottoman calligraphy & more.", image: "images/sabanci.jpg", lat: 41.1094, lon: 29.0555, map: "https://www.google.com/maps/place/Sak%C4%B1p+Sabanc%C4%B1+M%C3%BCzesi/@41.1093969,29.0554667,17z" },
    { name: "Panorama 1453", description: "Conquest of Constantinople.", image: "images/panorama.jpg", lat: 41.0052, lon: 28.9206, map: "https://www.google.com/maps/place/Panorama+1453+History+Museum/@41.0052355,28.9206475,17z" },
    { name: "Toy Museum", description: "Toys from around the world.", image: "images/toy.jpg", lat: 40.9674, lon: 29.0843, map: "https://www.google.com/maps/place/Istanbul+Toy+Museum/@40.9674371,29.0842597,17z" },
    { name: "Museum of Innocence", description: "Inspired by Orhan Pamuk's novel.", image: "images/innocence.jpg", lat: 41.0330, lon: 28.9789, map: "https://www.google.com/maps/place/The+Museum+of+Innocence/@41.0329635,28.9789232,17z" },
    { name: "Miniatürk", description: "Miniature Turkish landmarks.", image: "images/miniaturk.jpg", lat: 41.0687, lon: 28.9497, map: "https://www.google.com/maps/place/Miniat%C3%BCrk/@41.0686708,28.9497131,17z" },
    { name: "Sea Museum", description: "Naval history of Turkey.", image: "images/deniz.jpg", lat: 41.0442, lon: 29.0046, map: "https://www.google.com/maps/place/Maritime+Museum/@41.0441933,29.0045987,17z" }
  ],
  markets: [
    { name: "Grand Bazaar", description: "One of the world’s oldest markets.", image: "images/grand_bazaar.jpg", lat: 41.0107, lon: 28.9682, map: "https://www.google.com/maps/place/Grand+Bazaar/@41.0106737,28.9681803,17z" },
    { name: "Spice Bazaar", description: "Colorful food and spice stalls.", image: "images/spice.jpg", lat: 41.0165, lon: 28.9720, map: "https://www.google.com/maps/place/Spice+Bazaar/@41.0165397,28.9719532,17z" },
    { name: "Kadıköy Market", description: "Food, clothes, everything!", image: "images/kadikoy.jpg", lat: 40.9903, lon: 29.0271, map: "https://www.google.com/maps/place/Kad%C4%B1k%C3%B6y+Market/@40.9902919,29.0271388,17zзуйцуйц" },
    { name: "Beşiktaş Bazaar", description: "Local crowd’s favorite.", image: "images/besiktas.jpg", lat: 41.0426, lon: 29.0079, map: "https://www.google.com/maps/place/Be%C5%9Fikta%C5%9F+Market/@41.042646,29.007957,17z" },
    { name: "Feriköy Secondhand Market", description: "Saturdays only!", image: "images/ferikoy.jpg", lat: 41.0628, lon: 28.9829, map: "https://www.google.com/maps/place/Ferik%C3%B6y+Organic+Market/@41.0628428,28.9829478,17z" },
    { name: "Çarşamba Bazaar", description: "Cheap and cheerful street market.", image: "images/carsamba.jpg", lat: 41.0199, lon: 28.9499, map: "https://www.google.com/maps/place/%C3%87ar%C5%9Famba+Bazaar/@41.0198658,28.9499384,17z" },
    { name: "Bakırköy Bazaar", description: "Popular with locals.", image: "images/bakirkoy.jpg", lat: 40.9747, lon: 28.8556, map: "https://www.google.com/maps/place/Bak%C4%B1rk%C3%B6y+Bazaar/@40.9747145,28.8556188,17z" },
    { name: "Yeşilköy Market", description: "Upscale feel, local charm.", image: "images/yesilkoy.jpg", lat: 40.9660, lon: 28.8143, map: "https://www.google.com/maps/place/Ye%C5%9Filk%C3%B6y+Market/@40.9659682,28.8143452,17z" },
    { name: "Kuzguncuk Market", description: "Artisan, boho style.", image: "images/kuzguncuk.jpg", lat: 41.0431, lon: 29.0150, map: "https://www.google.com/maps/place/Kuzguncuk/@41.0430995,29.0150442,17z" },
    { name: "Tarlabaşı Sunday Market", description: "Colorful and diverse.", image: "images/tarlabasi.jpg", lat: 41.0389, lon: 28.9832, map: "https://www.google.com/maps/place/Tarlaba%C5%9F%C4%B1+Sunday+Market/@41.0389447,28.9831755,17z" }
  ],
  viewpoints: [
    { name: "Galata Tower", description: "Panoramic city view.", image: "images/galata.jpg", lat: 41.0256, lon: 28.9744, map: "https://www.google.com/maps/place/Galata+Tower/@41.0256462,28.9744344,17z" },
    { name: "Çamlıca Hill", description: "Asia side’s best view.", image: "images/camlica.jpg", lat: 41.0226, lon: 29.0624, map: "https://www.google.com/maps/place/Çamlıca+Hill/@41.0225518,29.0624425,17z" },
    { name: "Pierre Loti Hill", description: "Golden Horn scenery.", image: "images/pierre.jpg", lat: 41.0537, lon: 28.9395, map: "https://www.google.com/maps/place/Pierre+Loti+Hill/@41.0537265,28.9395001,17z" },
    { name: "Maiden's Tower", description: "Historical and scenic.", image: "images/kizkulesi.jpg", lat: 41.0211, lon: 29.0042, map: "https://www.google.com/maps/place/Maiden's+Tower/@41.0210757,29.0042327,17z" },
    { name: "Otagtepe", description: "Hidden gem in Beykoz.", image: "images/otagtepe.jpg", lat: 41.0945, lon: 29.0939, map: "https://www.google.com/maps/place/Otagtepe+Park/@41.0945389,29.0939165,17z" },
    { name: "Moda Pier", description: "Romantic sunset spot.", image: "images/moda(1).jpg", lat: 41.9818, lon: 29.0244, map: "https://www.google.com/maps/place/Moda+Pier/@40.9818479,29.0244205,17z" },
    { name: "Tophane Fountain", description: "Nearby scenic cafes.", image: "images/tophane.jpg", lat: 41.0278, lon: 28.9830, map: "https://www.google.com/maps/place/Tophane+Fountain/@41.0277542,28.9829819,17z" },
    { name: "Yoros Castle", description: "Nature and history meet.", image: "images/yoros.jpg", lat: 41.1791, lon: 29.1130, map: "https://www.google.com/maps/place/Yoros+Castle/@41.1791232,29.1130353,17z" },
    { name: "Fethi Paşa Grove", description: "Peaceful family park.", image: "images/fethi.jpg", lat: 41.0382, lon: 29.0382, map: "https://www.google.com/maps/place/Fethi+Pa%C5%9Fa+Korusu/@41.0382432,29.0381852,17z" },
    { name: "Büyük Valide Han Roof", description: "Secret rooftop view!", image: "images/validehan.jpg", lat: 41.0165, lon: 28.9687, map: "https://www.google.com/maps/place/B%C3%BCy%C3%BCk+Valide+Han/@41.0165294,28.9687413,17z" }
  ]
};

// API endpoint'i
app.get('/api/places', (req, res) => {
  res.json(data);
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});