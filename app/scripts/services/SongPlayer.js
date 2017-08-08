(function() {
     function SongPlayer() {
          var SongPlayer = {};
          
          /**
          * @desc object that hold current song value
          * @type {Object}
          */
          var currentSong = null;
          
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
                  currentSong.playing = null;
              }
 
              currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
              });
 
              currentSong = song;
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
          * @method Songplayer.play
          * @desc Determines song state when user clicks icon and plays song
          * @param {Object} song
          */
          SongPlayer.play = function(song) {
              if (currentSong !== song) {
                  setSong(song);
                  playSong(song);
                  
              } else if (currentSong === song) {
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
              currentBuzzObject.pause();
              song.playing = false;
          };
          
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();