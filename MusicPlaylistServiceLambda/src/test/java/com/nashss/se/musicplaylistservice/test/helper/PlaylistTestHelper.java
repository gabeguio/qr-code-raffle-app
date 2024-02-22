package com.nashss.se.musicplaylistservice.test.helper;

import com.nashss.se.musicplaylistservice.dynamodb.models.AlbumTrack;
import com.nashss.se.musicplaylistservice.dynamodb.models.Playlist;

import java.util.LinkedList;
import java.util.List;

public final class PlaylistTestHelper {
    private PlaylistTestHelper() {
    }

    public static Playlist generatePlaylist() {
        return generatePlaylistWithNAlbumTracks(1);
    }

    /**
     * Use this to simplify creating a test Playlist
     */
    public static Playlist generatePlaylistWithNAlbumTracks(int numTracks) {
        Playlist playlist = new Playlist();

        // As you add fields with getter/setters, you can call the setters here like this:
        playlist.setId("id");

        List<AlbumTrack> albumTracks = new LinkedList<>();
        for (int i = 0; i < numTracks; i++) {
            albumTracks.add(AlbumTrackTestHelper.generateAlbumTrack(i));
        }
        playlist.setSongList(albumTracks);

        return playlist;
    }
}
