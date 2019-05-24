import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { UserArea } from './profile/area';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from './services/authentication.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { DatabaseService } from './services/databases.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import * as firebase from 'firebase';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { HttpClientModule } from '@angular/common/http';
import { ModalPageModule } from './modal/modal.module';
import { FilterModalPageModule } from './filter-modal/filter-modal.module';
import { ReportPageModule } from './report/report.module';
import {SpinnerDialog} from "@ionic-native/spinner-dialog/ngx";
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {DatePicker} from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';
import { SMS } from '@ionic-native/sms/ngx';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Network } from '@ionic-native/network/ngx';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ModalPageModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule,
    HttpClientModule,
    FilterModalPageModule,
    ReportPageModule ,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticateService,
    DatabaseService,
    ImagePicker,
    Crop,
    Camera,
    GooglePlus,
    Facebook,
    SMS,
    UserArea,
    SpinnerDialog,
    SocialSharing,
    AndroidPermissions,
    CallNumber,
    EmailComposer,
    AppAvailability,
    DatePipe,
    Network,
    DatePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
