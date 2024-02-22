package com.qrcoderaffleappservice.dependency;

import com.qrcoderaffleappservice.activity.AddSongToPlaylistActivity;
import com.qrcoderaffleappservice.activity.CreatePlaylistActivity;
import com.qrcoderaffleappservice.activity.GetPlaylistActivity;
import com.qrcoderaffleappservice.activity.GetPlaylistSongsActivity;
import com.qrcoderaffleappservice.activity.UpdatePlaylistActivity;

import dagger.Component;

import javax.inject.Singleton;

/**
 * Dagger component for providing dependency injection in the Music Playlist Service.
 */
@Singleton
@Component(modules = {DaoModule.class, MetricsModule.class})
public interface ServiceComponent {
    /**
     * Provides the relevant activity.
     * @return GetPlaylistActivity
     */
    GetPlaylistActivity provideGetPlaylistActivity();

}
