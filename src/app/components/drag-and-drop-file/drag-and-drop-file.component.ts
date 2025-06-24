import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-drag-and-drop-file',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './drag-and-drop-file.component.html',
  styleUrl: './drag-and-drop-file.component.scss'
})
export class DragAndDropFileComponent {
  @Input() fileControl: FormControl = new FormControl();
  @Input() fileErrorMessage: any;
  @Input() uploading = false;
  @Input() lastUploadedFile: { fileName?: string; id?: string } = {};
  @Input() acceptedType: string[] = [];
  @Input()  maxFileSize: number | undefined;
  @Input() nomeFile: string = '';

  @Output() nomeFileChange: EventEmitter<string> = new EventEmitter();

  // Drag and drop file
  labelFile: string = 'cerca nel dispositivo';

  isDragover = false;

  constructor() {}

  onFileChangeEvent(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      this.fileChecker(file);
    }
  }

  fileChecker(file: File | null | undefined) {
    if (file && this.checkValidType(file.type)) {
      // controllo se la size del file è maggiore di 2MB
      if (
        file.size == 0 ||
        (this.maxFileSize ? file.size > this.maxFileSize : false)
      ) {
        this.fileErrorMessage =
          file.size == 0
            ? 'Il file selezionato è vuoto, seleziona un file valido'
            : 'Seleziona un file con dimensione minore di 2MB';
        this.fileControl.reset();
      } else {
        this.nomeFile = `${Date.now()}-${file.name}`;
        this.nomeFileChange.next(this.nomeFile);

        this.fileErrorMessage = '';
        try {
          this.fileControl.setValue(file);
        } catch {}
      }
    } else {
      this.fileErrorMessage =
        'Formato del file non corretto carica un formato valido';
      this.fileControl.reset();
    }
  }

  checkValidType(fileType: string) {
    let isAccepted = false;

    if (this.acceptedType.length > 0) {
      this.acceptedType.forEach((type) => {
        if (type.toLowerCase() == fileType.toLowerCase()) {
          isAccepted = true;
          return;
        }
      });
    } else {
      isAccepted = true;
    }
    return isAccepted;
  }

  dropFile(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer?.files;

    if (files && files?.length > 0) {
      this.fileChecker(files?.item(0));
    }
    this.isDragover = false;
  }

  dragOverFile(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.labelFile = 'Rilascia il file';
    this.isDragover = true;
  }

  dragLeaveFile(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  getDragOverClass() {
    if (this.isDragover) {
      return 'dragover opacity';
    }
    return '';
  }

}
