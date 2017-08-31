(function() {
     function SongPlayer($rootScope, Fixtures) {
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
              
              currentBuzzObject.bind('timeupdate', function() {
                  $rootScope.$apply(function() {
                      SongPlayer.currentTime = currentBuzzObject.getTime();
                  });
              });
              
 
              SongPlayer.currentSong = song;
          };
          
          /**
          * @function playSong
          * @desc Plays song and sets status of song to playing
          * @param {Object} song
          */
          var playSong = function(song) {
              currentBuzzObject.play();
              song.playing = true;   
          };
         
         /**
          * @function stopSong
          * @desc Stops song and sets status of song to not playing
          * @param {Object} song
          */
          var stopSong = function(song) {
              currentBuzzObject.stop();
              song.playing = null;
          }
         
         
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
          * @desc Current playback time (in seconds) of currently playing song
          * @type {Number}
          */
          SongPlayer.currentTime = null;
         
          /**
          * @desc Current playback volume of currently playing song
          * @type {Number}
          */
          SongPlayer.volume = 25;
         
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
                  stopSong(song);
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };
          
           /**
          * @method SongPlayer.next
          * @desc Sets currentSongIndex to plus one of the value of the song playing and plays that song if currently playing song is not the last song
          * @param {Object} song
          */
          SongPlayer.next = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex++;
              
              if (currentSongIndex > currentAlbum.songs.length) {
                  stopSong(song);
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };
         
          /**
          * @function setCurrentTime
          * @desc Set current time (in seconds) of currently playing song
          * @param {Number} time
          */
          SongPlayer.setCurrentTime = function(time) {
              if (currentBuzzObject) {
                  currentBuzzObject.setTime(time);
               }
          };
         
          /**
          * @function setVolume
          * @desc Set current volume of currently playing song
          * @param {Number} volume
          */
          SongPlayer.setVolume = function(volume) {
              if (currentBuzzObject) {
                  currentBuzzObject.setVolume(volume);
               }
          };
          
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();