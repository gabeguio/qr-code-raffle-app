package com.nashss.se.musicplaylistservice.test.helper;

import com.nashss.se.musicplaylistservice.dynamodb.models.AlbumTrack;
import com.nashss.se.musicplaylistservice.models.SongModel;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public final class AlbumTrackTestHelper {
    private AlbumTrackTestHelper() {
    }

    /**
     * Use this to simplify creating a test AlbumTrack
     */
    public static AlbumTrack generateAlbumTrack(int sequenceNumber) {
        AlbumTrack albumTrack = new AlbumTrack();

        // As you add fields with getter/setters, you can call the setters here like this:
        //  albumTrack.setAsin("asin" + sequenceNumber);

        return albumTrack;
    }

    /**
     * Simplify asserting that a list of AlbumTracks  match a List of SongModels
     */
    public static void assertAlbumTracksEqualSongModels(List<AlbumTrack> albumTracks, List<SongModel> songModels) {
        assertEquals(albumTracks.size(),
                     songModels.size(),
                     String.format("Expected album tracks (%s) and song models (%s) to match",
                                   albumTracks,
                                   songModels));
        for (int i = 0; i < albumTracks.size(); i++) {
            assertAlbumTrackEqualsSongModel(
                albumTracks.get(i),
                songModels.get(i),
                String.format("Expected %dth album track (%s) to match corresponding song model (%s)",
                              i,
                              albumTracks.get(i),
                              songModels.get(i)));
        }
    }

    /**
     * Simplify asserting that a AlbumTrack's fields match a SongModel's fields
     */
    public static void assertAlbumTrackEqualsSongModel(AlbumTrack albumTrack, SongModel songModel) {
        String message = String.format("Expected album track %s to match song model %s", albumTrack, songModel);
        assertAlbumTrackEqualsSongModel(albumTrack, songModel, message);
    }

    /**
     * Simplify asserting that a AlbumTrack's fields match a SongModel's fields
     */
    public static void assertAlbumTrackEqualsSongModel(AlbumTrack albumTrack, SongModel songModel, String message) {
        // Add asserts for individual fieds
        // assertEquals(albumTrack.getAsin(), songModel.getAsin(), message);
    }
}
