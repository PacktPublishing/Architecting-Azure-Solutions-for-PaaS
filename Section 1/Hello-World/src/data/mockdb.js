// Just a stupid file.
let songs = [
    "Not Afraid", "Phenomenal", "Guts Over Fear", "Bad Husband", "River"
];

module.exports = { 
    getSongs: function() {
        return songs;
    }, 
    getSong: function(index) {
        try {
            return songs[index];
        } catch (error) {
            return "Songs are limited, and author was interested only in Eminem's songs to be added in the list.";
        }
    },
    addSong: function(title) {
        try {
            songs.push(title);
            return true;
        } catch (error) {
            return false;
        }
    },
    updateSong: function(oldTitle, newTitle) {
        var songIndex = songs.indexOf(oldTitle);
        if(songIndex != -1) {
            songs[songIndex] = newTitle;
            return true;
        }

        return false;
    }
};