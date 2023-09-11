import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-choice-list-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-choice-list-view.component.html',
  styleUrl: './top-choice-list-view.component.scss'
})
export class TopChoiceListViewComponent {
  books = [
    { name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', image: 'assets/gatsby.jpg' },
    { name: '1984', author: 'George Orwell', image: 'assets/1984.jpg' },
    { name: 'To Kill a Mockingbird', author: 'Harper Lee', image: 'assets/mockingbird.jpg' },
    { name: 'Pride and Prejudice', author: 'Jane Austen', image: 'assets/pride.jpg' },
    { name: 'Moby Dick', author: 'Herman Melville', image: 'assets/moby.jpg' },
    { name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', image: 'assets/gatsby.jpg' },
    { name: '1984', author: 'George Orwell', image: 'assets/1984.jpg' },
    { name: 'To Kill a Mockingbird', author: 'Harper Lee', image: 'assets/mockingbird.jpg' },
    { name: 'Pride and Prejudice', author: 'Jane Austen', image: 'assets/pride.jpg' },
    { name: 'Moby Dick', author: 'Herman Melville', image: 'assets/moby.jpg' },
    { name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', image: 'assets/gatsby.jpg' },
    { name: '1984', author: 'George Orwell', image: 'assets/1984.jpg' },
    { name: 'To Kill a Mockingbird', author: 'Harper Lee', image: 'assets/mockingbird.jpg' },
    { name: 'Pride and Prejudice', author: 'Jane Austen', image: 'assets/pride.jpg' },
    { name: 'Moby Dick', author: 'Herman Melville', image: 'assets/moby.jpg' },
  ];
}
