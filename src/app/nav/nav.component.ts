import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';

declare function showAndHide(): any;
  

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  constructor(private readonly userService: UsersService){}

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;


  ngOnInit(): void {
      this.isAuthenticated = this.userService.isAuthenticated();
      this.isAdmin = this.userService.isAdmin();
      this.isUser = this.userService.isUser();
  }

  logout():void{
    this.userService.logOut();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
  }

  
  ngAfterViewInit() {
    const btnSidebarToggler = document.getElementById("btnSidebarToggler");
    const navbar = document.getElementById("navbar");
    const sidebar = document.getElementById("sidebar");
    const navClosed = document.getElementById("navClosed");
    const navOpen = document.getElementById("navOpen");
  
    if (btnSidebarToggler && navbar && sidebar && navClosed && navOpen) {
      btnSidebarToggler.addEventListener("click", (e) => {
        e.preventDefault();
        sidebar.classList.toggle("show");
        navClosed.classList.toggle("hidden");
        navOpen.classList.toggle("hidden");
    });
  
      sidebar.style.top = navbar.clientHeight - 1 + "px";
    }
  }
  

  
}



