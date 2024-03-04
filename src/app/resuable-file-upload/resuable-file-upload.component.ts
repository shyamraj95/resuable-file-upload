import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-resuable-file-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTooltipModule, MatChipsModule, MatIconModule],
  templateUrl: './resuable-file-upload.component.html',
  styleUrl: './resuable-file-upload.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
})

export class ResuableFileUploadComponent implements OnInit, OnDestroy {

  attachedFiles: File[] = [];
  isHovering !: boolean;
  acceptedFileTypes !: string;
  fileModel: File[] = [];
  @Input() isMultipleFilesAllow: boolean = true;
  @Input() draggable: boolean = true;
  @Input({ required: true }) allowedFileTypes !: Array<'jpg' | 'jpeg' | 'png' | 'pdf' | 'csv' | 'xlsx'>;
  @Input() dropZoneLabel !: string;
  // @Output () selectedFiles: EventEmitter<File[]>= new EventEmitter();

  // to get parent form group and add new form control on parent form group
  @Input({ required: true }) controlName !: string;

  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  constructor(
    @Inject(DOCUMENT) private _document: Document) {

  }
  ngOnInit(): void {
    this.acceptedFileTypes = this.allowedFileTypes.map(items => '.' + items).join();
    this.parentFormGroup.addControl(this.controlName, new FormControl<string | null>("", Validators.required))
  }
  dragStart(event: DragEvent) {
    event.preventDefault();
    // event.dataTransfer!.dropEffect = 'copy';
    this.isHovering = true;
  }

  onDropSuccess(event: any) {
    event.preventDefault();
    this.onFileChange(event.dataTransfer.files);
  }


  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.onFileChange(input.files as FileList);
  }

  ngOnDestroy(): void {
    if (this.parentFormGroup) {
      this.parentFormGroup.removeControl(this.controlName);
    }
  }
  private onFileChange(files: FileList) {
    this.isHovering = false;
    if (files.length) {
      if (this.isMultipleFilesAllow) {
        for (let i = 0; i < files.length; i++) {
          if (this.allowedFileType(files[i])) {
            this.attachedFiles.push(files[i]);
            if (i === files.length - 1) {
              this.parentFormGroup.controls[this.controlName].setValue(this.attachedFiles);
              // this.selectedFiles.emit(this.attachedFiles);
            }
          }
        }
      } else if (!this.isMultipleFilesAllow && files.length === 1) {
        this.attachedFiles = [] as File[];
        if (this.allowedFileType(files[0])) {

          this.attachedFiles.push(files[0]);
          // this.selectedfiles.emit(this.attachedFiles)
          this.parentFormGroup.controls[this.controlName].setValue(this.attachedFiles)
        }
      } else {
        // this.selectedFiles.emit(this.attachedFiles);
        console.log('Multiple files are not allow to upload');
      }
    }
  }
  private allowedFileType(file: File) {
    if (file?.name) {
      const fileName = file.name;
      const extension = fileName.split(".").pop()!.toLowerCase();
      if ((this.allowedFileTypes as string[]).includes(extension)) {
        return true;
      } else
        return false;
    } else {
      return false;
    }
  }

  removeFile(file: File): void {
    const index = this.attachedFiles.indexOf(file);
    if (index >= 0) {
      this.attachedFiles.splice(index, 1);
      // this.selectedFiles.emit(this.attachedFiles);
      if (!this.attachedFiles.length) {
        (<HTMLInputElement>this._document.getElementById('file-input')).value = "";
        this.parentFormGroup.controls[this.controlName].setValue(this.attachedFiles);
      }
    }
  }
}