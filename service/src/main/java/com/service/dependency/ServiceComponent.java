package com.service.dependency;

import com.service.activity.CreateScannerActivity;
import com.service.activity.CreateVisitActivity;
import com.service.activity.GetScannerActivity;
import com.service.activity.GetVisitsActivity;
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
     * @return GetScannerActivity
     */
    GetScannerActivity provideGetScannerActivity();
    /**
     * Provides the relevant activity.
     * @return GetPlaylistActivity
     */
    CreateScannerActivity provideCreateScannerActivity();
    /**
     * Provides the relevant activity.
     * @return CreateVisitActivity
     */
    CreateVisitActivity provideCreateVisitActivity();
    /**
     * Provides the relevant activity.
     * @return GetVisitsActivity
     */
    GetVisitsActivity provideGetVisitsActivity();
}
