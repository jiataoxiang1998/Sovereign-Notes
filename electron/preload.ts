import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  startDrag: () => ipcRenderer.send('window-start-drag'),
  clipboardWrite: (text: string) => ipcRenderer.invoke('clipboard-write', text)
})