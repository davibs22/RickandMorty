import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

//Imports Components
import { EpisodesComponent } from './episodes/episodes.component'
import { CharactersComponent } from './characters/characters.component'
import { LocationsComponent } from './locations/locations.component'

const APP_ROUTES: Routes = [
    { path: 'locations', component: LocationsComponent },
    { path: 'episodes', component: EpisodesComponent },
    { path: '', component: CharactersComponent }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES)

declare module "@angular/core" {
    interface ModuleWithProviders<T = any> {
        ngModule: Type<T>;
        providers?: Provider[];
    }
}