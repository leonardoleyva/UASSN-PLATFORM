import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { HeaderComponent } from './core/components/header/header.component';
import { AvatarComponent } from './shared/components/avatar/avatar.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthTabMenuComponent } from './shared/components/auth-tab-menu/auth-tab-menu.component';

import { environment } from 'src/environments/environment';
import { RegistrationComponent } from './modules/registration/registration.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { SelectComponent } from './shared/components/select/select.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { HomeComponent } from './modules/home/home.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { userReducer } from './core/auth/user.reducer';
import { PostsComponent } from './modules/home/components/posts/posts.component';
import { PostComponent } from './modules/home/components/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AvatarComponent,
    LoginPageComponent,
    AuthTabMenuComponent,
    RegistrationComponent,
    RegistrationPageComponent,
    SelectComponent,
    HomeComponent,
    HomePageComponent,
    PostsComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    StoreModule.forRoot({
      router: routerReducer,
      userState: userReducer,
    }),
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private titleService: Title) {
    this.titleService.setTitle(`${environment.PLATFORM_NAME}`);
  }
}
