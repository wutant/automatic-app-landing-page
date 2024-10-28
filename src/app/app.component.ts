import { Component } from '@angular/core';
declare const window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'electron-app';


  printPDF(filePath: string) {
    window.ipcRenderer.send('print-pdf', filePath);
  }

  scanDocument() {
    window.ipcRenderer.send('scan-document');

    window.ipcRenderer.on('scan-result', (event:any, result:any) => {
      console.log('ไฟล์สแกนเรียบร้อย:', result);
      alert('ไฟล์สแกนเรียบร้อย')
      // จัดการไฟล์ที่สแกนได้ที่นี่ เช่น แสดงหรือบันทึก
    });

    window.ipcRenderer.on('scan-error', (event:any, errorMsg:any) => {
      console.error(errorMsg);
      alert('error')
    });
  }

}
