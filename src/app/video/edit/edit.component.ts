import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges , Output, EventEmitter} from '@angular/core';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges{

  @Input() activeClip: IClip | null = null;
  inSubmission = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait';
  @Output() update = new EventEmitter();

  clipId = new FormControl('',{nonNullable: true});
  title = new FormControl('', {validators:[Validators.required, Validators.minLength(3)], nonNullable: true});
  editForm = new FormGroup({
    title: this.title
  })

  constructor(private modal: ModalService, private clipService: ClipService){

  }

  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.activeClip){
      return
    }
    this.inSubmission = false;
    this.showAlert = false;
    this.clipId.setValue(this.activeClip.docID as string);
    this.title.setValue(this.activeClip.title);
  }

  async submit(){
    if(!this.activeClip){
      return;
    }
    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait';
    try {
      await this.clipService.updateClip(this.clipId.value, this.title.value);
    } catch (error) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Someting went wrong';
      return;
    }
    this.activeClip.title = this.title.value;
    this.update.emit(this.activeClip);
    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success';
  }
}
