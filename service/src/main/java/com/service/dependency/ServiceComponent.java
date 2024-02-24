package com.service.dependency;

import com.service.activity.CreateScannerActivity;

import dagger.Component;

import javax.inject.Singleton;

/**
 * Dagger component for providing dependency injection in the Music Playlist Service.
 */
@Singleton
@Component(modules = {DaoModule.class})
public interface ServiceComponent {
    /**
     * Provides the relevant activity.
     * @return GetPlaylistActivity
     */
    CreateScannerActivity provideCreateScannerActivity();

}
