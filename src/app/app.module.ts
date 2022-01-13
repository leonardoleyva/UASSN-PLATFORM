import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
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
import { HomePageComponent } from './pages/home-page/home-page.component';
import { userReducer } from './core/auth/user.reducer';
import { HomePostsComponent } from './modules/feed/home-posts/home-posts.component';
import { PostComponent } from './modules/feed/components/post/post.component';
import { PostMakerComponent } from './modules/feed/components/post-maker/post-maker.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfilePostsComponent } from './modules/feed/profile-posts/profile-posts.component';
import { ChatUserComponent } from './modules/chat/components/chat-user/chat-user.component';
import { HomeUsersComponent } from './modules/chat/home-users/home-users.component';
import { ChatRoomComponent } from './modules/chat/components/chat-room/chat-room.component';
import { chatReducer } from './modules/chat/state/chat.reducer';
import { HeaderMenuComponent } from './core/components/header-menu/header-menu.component';

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
    HomePageComponent,
    HomePostsComponent,
    PostComponent,
    PostMakerComponent,
    ProfilePageComponent,
    ProfilePostsComponent,
    ChatUserComponent,
    HomeUsersComponent,
    ChatRoomComponent,
    HeaderMenuComponent,
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    FormsModule,
    PickerModule,
    EmojiModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    StoreModule.forRoot({
      router: routerReducer,
      userState: userReducer,
      chatState: chatReducer,
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
