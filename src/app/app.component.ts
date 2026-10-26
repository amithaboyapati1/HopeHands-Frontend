import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
 selector: 'app-root', standalone: true, imports: [CommonModule, FormsModule],
 template: `
 <header class="topbar"><a class="brand" href="#"><span class="brand-icon">♥</span> HopeHands</a><nav><a href="#mission">Our mission</a><a href="#programs">Programs</a><a href="#volunteer">Volunteer</a><a href="#contact">Contact</a></nav><a class="nav-cta" href="#volunteer">Get involved ↗</a></header>
 <main>
 <section class="hero"><div class="hero-copy"><div class="eyebrow"><span class="dot"></span> SMALL ACTS. BIG CHANGE.</div><h1>Make kindness<br>go <em>further.</em></h1><p class="hero-text">Together, we can build a world where every person has the chance to thrive. Your time, care, and support can change a life.</p><div class="hero-actions"><a class="button primary" href="#volunteer">Become a volunteer ↗</a><a class="text-link" href="#mission">Discover our mission ↓</a></div><div class="impact-row"><div><strong>12,400+</strong><small>Lives touched</small></div><div><strong>860+</strong><small>Active volunteers</small></div><div><strong>28</strong><small>Communities</small></div></div></div>
 <div class="hero-art"><div class="sun"></div><div class="art-card card-top">✦ &nbsp; Every hand matters</div><div class="people-art"><div class="person p1"><i></i><b></b></div><div class="person p2"><i></i><b></b></div><div class="person p3"><i></i><b></b></div><div class="heart">♥</div></div><div class="art-card card-bottom"><span class="mini-heart">♥</span><div><b>One community</b><small>Countless possibilities</small></div></div><div class="spark s1">✳</div><div class="spark s2">✦</div></div></section>
 <section class="mission section" id="mission"><div><div class="eyebrow">WHY WE'RE HERE</div><h2>A little hope can<br>change <em>everything.</em></h2></div><p>HopeHands is a community-driven non-profit bringing people together to support families, improve access to education, and create healthier, stronger communities.</p></section>
 <section class="programs section" id="programs"><div class="section-heading"><div><div class="eyebrow">WHAT WE DO</div><h2>Hope in <em>action.</em></h2></div><p>Practical help. Lasting impact.<br>Made possible by people like you.</p></div><div class="program-grid"><article class="program green"><div class="program-icon">✎</div><span class="program-number">01 / EDUCATION</span><h3>Learning for<br>every child</h3><p>Learning supplies, mentoring, and opportunities for brighter futures.</p><a href="#volunteer">Support this work ↗</a></article><article class="program peach"><div class="program-icon">♡</div><span class="program-number">02 / WELLBEING</span><h3>Care that<br>reaches everyone</h3><p>Connecting families with essential resources and community care.</p><a href="#volunteer">Support this work ↗</a></article><article class="program yellow"><div class="program-icon">☀</div><span class="program-number">03 / COMMUNITY</span><h3>Stronger, side<br>by side</h3><p>Bringing neighbors together to create meaningful local change.</p><a href="#volunteer">Support this work ↗</a></article></div></section>
 <section class="volunteer section" id="volunteer"><div class="volunteer-copy"><div class="eyebrow">YOUR NEXT CHAPTER</div><h2>Be the reason<br>someone <em>smiles.</em></h2><p>You don't need special skills to make a difference. Just a caring heart and a little time.</p><div class="volunteer-note">✳ &nbsp; Your first step could mean the world to someone.</div></div><form class="form-card" (ngSubmit)="submitVolunteer()" #volForm="ngForm"><h3>Join our volunteer family</h3><p class="form-sub">Tell us a little about yourself.</p><label>Full name<input name="name" [(ngModel)]="volunteer.name" required placeholder="Your full name"></label><label>Email address<input name="email" [(ngModel)]="volunteer.email" required email type="email" placeholder="you@example.com"></label><label>I'm interested in<select name="interest" [(ngModel)]="volunteer.interest"><option>Community support</option><option>Education</option><option>Wellbeing</option><option>Fundraising</option></select></label><button class="button primary full" type="submit" [disabled]="volForm.invalid || busy">{{busy ? 'Sending…' : 'Sign me up'}} ↗</button><p class="form-message" [class.error]="error" *ngIf="message">{{message}}</p><small class="privacy">By signing up, you agree to be contacted by HopeHands.</small></form></section>
 <section class="contact section" id="contact"><div><div class="eyebrow">LET'S TALK</div><h2>Good things start<br>with <em>hello.</em></h2><p>Have a question or an idea for making a difference? We'd love to hear from you.</p></div><form class="contact-form" (ngSubmit)="submitMessage()" #msgForm="ngForm"><label>Your name<input name="contactName" [(ngModel)]="contact.name" required placeholder="Your name"></label><label>Email address<input name="contactEmail" [(ngModel)]="contact.email" type="email" required email placeholder="you@example.com"></label><label>Your message<textarea name="content" [(ngModel)]="contact.message" required rows="3" placeholder="How can we help?"></textarea></label><button class="button dark" [disabled]="msgForm.invalid || contactBusy">{{contactBusy ? 'Sending…' : 'Send message'}} ↗</button><p class="form-message" [class.error]="contactError" *ngIf="contactStatus">{{contactStatus}}</p></form></section>
 </main><footer><a class="brand" href="#"><span class="brand-icon">♥</span> HopeHands</a><p>Care in action. Hope for everyone.</p><span>© 2026 HopeHands NGO · Demo project</span></footer>`
})
export class AppComponent {
 private api = 'http://localhost:3000/api';
 volunteer = { name: '', email: '', interest: 'Community support' };
 contact = { name: '', email: '', message: '' };
 busy = false; error = false; message = ''; contactBusy = false; contactError = false; contactStatus = '';
 constructor(private http: HttpClient) {}
 submitVolunteer() {
  this.busy = true; this.message = ''; this.error = false;
  this.http.post(`${this.api}/volunteers`, this.volunteer).subscribe({
   next: () => { this.message = 'Thanks for joining us! Your details have been submitted.'; this.volunteer = { name: '', email: '', interest: 'Community support' }; this.busy = false; },
   error: err => { this.message = err?.error?.message || 'Could not connect to the backend. Start the backend and try again.'; this.error = true; this.busy = false; }
  });
 }
 submitMessage() {
  this.contactBusy = true; this.contactStatus = ''; this.contactError = false;
  this.http.post(`${this.api}/messages`, this.contact).subscribe({
   next: () => { this.contactStatus = 'Message sent. Thank you for reaching out!'; this.contact = { name: '', email: '', message: '' }; this.contactBusy = false; },
   error: err => { this.contactStatus = err?.error?.message || 'Could not connect to the backend. Start the backend and try again.'; this.contactError = true; this.contactBusy = false; }
  });
 }
}