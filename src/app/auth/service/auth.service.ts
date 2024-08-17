import { Injectable, Injector, OnInit } from '@angular/core';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { UserControllerService } from '../../user/controller/user-controller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  public user: firebase.User | null = null;
  public userObservable: Observable<firebase.User | null> = this.afAuth.user;
  public idTokenObservable: Observable<string | null> = this.afAuth.idToken;
  private authSubscription: Subscription | undefined;

  constructor(

    private injector: Injector,
  ) { }

  ngOnInit(): void {
    // Subscribe to changes on auth to catch the refresh token.
    this.authSubscription = this.userObservable.subscribe(
      (user) => {
        if (user) this.user = user;
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.authSubscription)
      this.authSubscription.unsubscribe();
  }

  // Handle signin method.
  public async emailAndPasswordLogin(
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> {
    const signResult = await this.afAuth.signInWithEmailAndPassword(email, password);
    await this.setCurrentUser();
    return signResult;
  }

  public async setCurrentUser() {
    this.user = await this.afAuth.currentUser;
    this.user?.getIdToken(true);
  }

  // Wait for user.
  public async whoAmI(
  ): Promise<firebase.User | null> {
    await firstValueFrom(this.afAuth.user);
    this.user = await this.afAuth.currentUser;

    return this.user;
  }

  public async notMeThenUpdate() {
    await this.user?.getIdToken(true);
    const userController = this.injector.get<UserControllerService>(UserControllerService);
    const me = await userController.me()
      .then(value => value)
      .catch(
        async error => {
          await userController.firstAccess(
            {
              email: this.user?.email || undefined,
              name: this.user?.displayName || undefined,
              phone: this.user?.phoneNumber || undefined,
            }
          );
        }
      );
    return me;
  }
}
