import { Component } from '@angular/core';
import { ResuableFileUploadComponent } from './resuable-file-upload/resuable-file-upload.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ResuableFileUploadComponent, ReactiveFormsModule, MatButtonModule,FormsModule, MatInputModule,MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  form = new FormGroup({
    remark: new FormControl('')
  });
  submit() {
    console.log(this.form.value);
    this.form.reset();
  }
}


