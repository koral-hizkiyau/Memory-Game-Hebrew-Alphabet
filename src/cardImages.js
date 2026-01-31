export const numOfImage = [6,9,12,15];
export const bestTime = [0,0,0,0];

const cardImages =[
  {"src": "/images/1.png", "matched": false , sound: "/sounds/ז.mp3", letter:"ז"},
  {"src": "/images/2.png", "matched": false,  sound: "/sounds/ג.mp3", letter:"ג"},
  {"src": "/images/3.png", "matched": false,  sound: "/sounds/ב.mp3", letter:"ב"},
  {"src": "/images/4.png", "matched": false, sound: "/sounds/א.mp3" , letter:"א"},
  {"src": "/images/5.png", "matched": false,  sound: "/sounds/ח.mp3", letter:"ח"},
  {"src": "/images/6.png", "matched": false,  sound: "/sounds/ו.mp3", letter:"ו"},
  {"src": "/images/7.png", "matched": false,  sound: "/sounds/ד.mp3", letter:"ד"},
  {"src": "/images/8.png", "matched": false,  sound: "/sounds/ל.mp3", letter:"ל"},
  {"src": "/images/9.png", "matched": false,  sound: "/sounds/כ.mp3", letter:"כ"},
  {"src": "/images/10.png", "matched": false,  sound: "/sounds/י.mp3", letter:"י"},
  {"src": "/images/11.png", "matched": false,  sound: "/sounds/ט.mp3", letter:"ט"},
  {"src": "/images/12.png", "matched": false,  sound: "/sounds/ע.mp3", letter:"ע"},
  {"src": "/images/13.png", "matched": false,  sound: "/sounds/ס.mp3", letter:"ס"},
  {"src": "/images/14.png", "matched": false,  sound: "/sounds/נ.mp3", letter:"נ"},
  {"src": "/images/15.png", "matched": false,  sound: "/sounds/מ.mp3", letter:"מ"},
  {"src": "/images/16.png", "matched": false,  sound: "/sounds/ר.mp3", letter:"ר"},
  {"src": "/images/17.png", "matched": false,  sound: "/sounds/ק.mp3", letter:"ק"},
  {"src": "/images/18.png", "matched": false,  sound: "/sounds/ה.mp3", letter:"ה"},
  {"src": "/images/19.png", "matched": false,  sound: "/sounds/פ.mp3", letter:"פ"},
  {"src": "/images/20.png", "matched": false,  sound: "/sounds/ת.mp3", letter:"ת"},
  {"src": "/images/21.png", "matched": false,  sound: "/sounds/ש.mp3", letter:"ש"},
  {"src": "/images/22.png", "matched": false,  sound: "/sounds/צ.mp3", letter:"צ"}

]
const randomImages = (numOfImage,i) =>{
    return cardImages.sort(() => Math.random() - 0.5).slice(0,numOfImage[i])

}
export const cardImagesAllLevels = [
    randomImages(numOfImage,0),
    randomImages(numOfImage,1),
    randomImages(numOfImage,2),
    randomImages(numOfImage,3)
]


