import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
interface User {
  name: string;
  email: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  userForm: FormGroup;

  items: User[] = [];

  fb = inject(FormBuilder);

  constructor() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      this.items.push(newUser);
      console.log(this.userForm.value);
      this.items = this.userForm.value;
      localStorage.setItem('user', this.userForm.value);
      this.userForm.reset();
    }
  }
}
