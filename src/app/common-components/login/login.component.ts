import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core';
import { environment } from 'src/app/environments/environment';
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
 public loader=false;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  public clientId = environment.clientId;

  ngOnInit(): void {
    this.loadGoogleScript().then(() => {
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: async (response: any) => {
          try {
            this.loader=true;
            this.cdr.detectChanges(); 
            const res = await fetch(`${environment.apiBasePath}/sign-up`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential: response.credential }),
            });

            const data = await res.json();
            sessionStorage.setItem("token", data.token);
            if(data.token){
              window.location.href = "/#/chat-session";
              this.loader=false;
              this.cdr.detectChanges(); 
            }
          } catch (error) {
            console.error("Login Error:", error);
            this.loader=false;
          }
        },
        auto_select: false,
      });

      google.accounts.id.renderButton(
        document.querySelector(".g_id_signin"),
        { theme: "outline", size: "large" }
      );
    }).catch(error => console.error("Google script loading failed:", error));
  }

  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById("google-auth-script")) {
        resolve();
        return;
      }

      const script = this.renderer.createElement("script");
      script.id = "google-auth-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = () => resolve();
      script.onerror = () => reject();
      this.renderer.appendChild(document.body, script);
    });
  }
}
