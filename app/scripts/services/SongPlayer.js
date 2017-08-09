(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
         
          /**
          * @desc object that stores album data
          * @type {Object}
          */
          var currentAlbum = Fixtures.getAlbum();
          
          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;
          
          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
          var setSong = function(song) {
              if (currentBuzzObject) {
                  currentBuzzObject.stop();
                  SongPlayer.currentSong.playing = null;
              }
 
              currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
              });
 
              SongPlayer.currentSong = song;
          };
          
          /**
          * @function playsong
          * @desc Plays song and sets status of song to playing
          * @param {Object} song
          */
          var playSong = function(song) {
              currentBuzzObject.play();
              song.playing = true;   
          };
         
         
          /**
          * @function getSongIndex
          * @desc Returns index of current song in array
          * @param {Object} song
          */
          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
          };
         
          /**
          * @desc object that hold current song value
          * @type {Object}
          */
          SongPlayer.currentSong = null;
         
          /**
          * @method Songplayer.play
          * @desc Determines song state when user clicks icon and plays song
          * @param {Object} song
          */
          SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                  setSong(song);
                  playSong(song);
                  
              } else if (SongPlayer.currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      playSong(song); 
                  }
              }              
          };
          
          /**
          * @method Songplayer.pause
          * @desc Pauses song
          * @param {Object} song
          */
          SongPlayer.pause = function(song) {
              song = song || SongPlayer.currentSong;
              currentBuzzObject.pause();
              song.playing = false;
          };
         
          /**
          * @method SongPlayer.previous
          * @desc Sets currentSongIndex to minus one of the value of the song playing and plays that song if currently playing song is not the first song
          * @param {Object} song
          */
          SongPlayer.previous = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex--;
              
              if (currentSongIndex < 0) {
                  currentBuzzObject.stop();
                  SongPlayer.currentSong.playing = null;
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };
          
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();