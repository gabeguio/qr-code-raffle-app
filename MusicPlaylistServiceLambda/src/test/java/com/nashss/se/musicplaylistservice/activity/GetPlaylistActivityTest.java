package com.nashss.se.musicplaylistservice.activity;

import com.nashss.se.musicplaylistservice.activity.requests.GetPlaylistRequest;
import com.nashss.se.musicplaylistservice.activity.results.GetPlaylistResult;
import com.nashss.se.musicplaylistservice.dynamodb.PlaylistDao;
import com.nashss.se.musicplaylistservice.dynamodb.models.Playlist;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.openMocks;

public class GetPlaylistActivityTest {
    @Mock
    private PlaylistDao playlistDao;

    private GetPlaylistActivity getPlaylistActivity;

    @BeforeEach
    public void setUp() {
        openMocks(this);
        getPlaylistActivity = new GetPlaylistActivity(playlistDao);
    }

    @Test
    public void handleRequest_savedPlaylistFound_returnsPlaylistModelInResult() {
        // GIVEN
        String expectedId = "expectedId";

        Playlist playlist = new Playlist();
        playlist.setId(expectedId);
        when(playlistDao.getPlaylist(anyString())).thenReturn(playlist);

        GetPlaylistRequest request = GetPlaylistRequest.builder()
            .withId(expectedId)
            .build();

        // WHEN
        GetPlaylistResult result = getPlaylistActivity.handleRequest(request);

        // THEN
        assertEquals(expectedId, result.getPlaylist().getId());
    }
}
