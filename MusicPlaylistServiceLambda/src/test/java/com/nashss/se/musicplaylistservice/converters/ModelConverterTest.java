package com.nashss.se.musicplaylistservice.converters;

import com.nashss.se.musicplaylistservice.dynamodb.models.Playlist;

import com.nashss.se.musicplaylistservice.models.PlaylistModel;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ModelConverterTest {
    private ModelConverter modelConverter = new ModelConverter();

    @Test
    void toPlaylistModel_convertsPlaylist() {
        Playlist playlist = new Playlist();
        playlist.setId("id");

        PlaylistModel playlistModel = modelConverter.toPlaylistModel(playlist);
        assertEquals(playlist.getId(), playlistModel.getId());
    }
}
