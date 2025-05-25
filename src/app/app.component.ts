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
  isEditing: boolean = false;
  editingIndex: number | null = null;

  fb = inject(FormBuilder);

  constructor() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
    // this.editUser();
  }

  ngOnInit(): void {
    const storedItems = localStorage.getItem('users');
    if (storedItems) {
      try {
        this.items = JSON.parse(storedItems);
      } catch (e) {
        console.error('Error parsing localStorage "users" data:', e);
        this.items = [];
      }
    }
  }

  submitForm() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      if (this.isEditing && this.editingIndex !== null) {
        this.items[this.editingIndex] = newUser;
      } else {
        this.items.push(newUser);
      }
      console.log(newUser);
      // this.items = this.userForm.value;
      localStorage.setItem('users', JSON.stringify(this.items));
      this.userForm.reset();
      this.isEditing = false;
      this.editingIndex = null;
    }
  }
  editUser(user: User, index: number) {
    // const data = JSON.parse(localStorage.getItem('users') || '{}');
    // this.items = { ...data };
    this.userForm.patchValue(user);
    this.isEditing = true;
    this.editingIndex = index;
  }
}
