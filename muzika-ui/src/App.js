import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./komponente/Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./stranice/Home";
import About from "./stranice/About";
import Player from "./stranice/Player";
import Login from "./stranice/Login";
import Register from "./stranice/Register";
import {useState} from "react";
import buciBu from "./pesme/buciBu.mp3";
import imaJednoPile from "./pesme/imaJednoPile.mp3";
import kadSiSrecan from "./pesme/kadSiSrecan.mp3";
import majmunskiPles from "./pesme/majmunskiPles.mp3";
import maliParadajz from "./pesme/maliParadajz.mp3";
import najlepsaMamaNaSvetu from "./pesme/najlepsaMamaNaSvetu.mp3";
import nezgoda from "./pesme/nezgoda.mp3";
import patofnice from "./pesme/patofnice.mp3";
import razboleSeLisica from "./pesme/razboleSeLisica.mp3";
import toJePileMalo from "./pesme/toJePileMalo.mp3";
import traktorMileta from "./pesme/traktorMileta.mp3";
import uspavankaZaMrava from "./pesme/uspavankaZaMrava.mp3";
import MyPlaylists from "./stranice/MyPlaylists";
import Admin from "./stranice/Admin";
import Add from './stranice/Add';


function App() {

    const songsAll = [
        {
            id: 1,
            title: "Buci Bu",
            artist: "Decije pesme 1",
            url: buciBu,
            duration: 200
        },
        {
            id: 2,
            title: "Ima jedno pile",
            artist: "Decije pesme 2",
            url: imaJednoPile,
            duration: 240
        },
        {
            id: 3,
            title: "Kad si srecan",
            artist: "Decije pesme 3",
            url: kadSiSrecan,
            duration: 180
        },
        {
            id: 4,
            title: "Majmunski ples",
            artist: "Decije pesme 4",
            url: majmunskiPles,
            duration: 220
        },
        {
            id: 5,
            title: "Mali paradajz",
            artist: "Decije pesme 5",
            url: maliParadajz,
            duration: 210
        }
        ,
        {
            id: 6,
            title: "Najlepsa mama na svetu",
            artist: "Decije pesme 6",
            url: najlepsaMamaNaSvetu,
            duration: 210
        }
        ,
        {
            id: 7,
            title: "Nezgoda",
            artist: "Decije pesme 7",
            url: nezgoda,
            duration: 210
        }
        ,
        {
            id: 8,
            title: "Patofnice",
            artist: "Decije pesme 8",
            url: patofnice,
            duration: 210
        }
        ,
        {
            id: 9,
            title: "Razbole se lisica",
            artist: "Decije pesme 9",
            url: razboleSeLisica,
            duration: 210
        }
        ,
        {
            id: 10,
            title: "To je pile malo",
            artist: "Decije pesme 10",
            url: toJePileMalo,
            duration: 210
        }
        ,
        {
            id: 11,
            title: "Traktor Mileta",
            artist: "Decije pesme 11",
            url: traktorMileta,
            duration: 210
        }
        ,
        {
            id: 12,
            title: "Uspavanka za mrava",
            artist: "Decije pesme 12",
            url: uspavankaZaMrava,
            duration: 210
        }

    ];

    const songMap = new Map();
    songMap.set("buciBu", buciBu);
    songMap.set("imaJednoPile", imaJednoPile);
    songMap.set("kadSiSrecan", kadSiSrecan);
    songMap.set("majmunskiPles", majmunskiPles);
    songMap.set("maliParadajz", maliParadajz);
    songMap.set("najlepsaMamaNaSvetu", najlepsaMamaNaSvetu);
    songMap.set("nezgoda", nezgoda);
    songMap.set("patofnice", patofnice);
    songMap.set("razboleSeLisica", razboleSeLisica);
    songMap.set("toJePileMalo", toJePileMalo);
    songMap.set("traktorMileta", traktorMileta);
    songMap.set("uspavankaZaMrava", uspavankaZaMrava);


    const [currentSong, setCurrentSong] = useState(null);
    const [index, setIndex] = useState(0);
    const [audio, setAudio] = useState(null);
    const [songs, setSongs] = useState(songsAll);

    const playSong = (index) => {
        if(audio){
            audio.pause();
        }
        setIndex(index);
        setCurrentSong(songs[index]);
        let audioNew = new Audio(songs[index].url);
        setAudio(audioNew);
        audioNew.play();
    }

    const pauseSong = () => {
        if (audio){
            audio.pause();
        }
    }

    const nextSong = () => {
        if (index + 1 < songs.length){
            playSong(index + 1);
        }else {
            playSong(0);
        }
    }

    const previousSong = () => {
        if (index - 1 >= 0){
            playSong(index - 1);
        }else {
            playSong(songs.length - 1);
        }
    }

  return (
    <div className="App">
      <Navigation />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/player" element={<Player playSong={playSong} pauseSong={pauseSong} nextSong={nextSong} previousSong={previousSong} index={index} currentSong={currentSong} songs={songs} audio={audio} />} />
            <Route path="/playlists" element={<MyPlaylists songs={songs} setSongs={setSongs} songMap={songMap} playSong={playSong} pauseSong={pauseSong} nextSong={nextSong} previousSong={previousSong} index={index} currentSong={currentSong} audio={audio} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/add" element={<Add songs={songs} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;