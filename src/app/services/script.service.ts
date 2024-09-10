import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async loadScript ({ id, url }: { id: string, url: string }) {
    return await new Promise((resolve, reject) => {
      if ((Boolean(id)) && (document.getElementById(id) != null)) {
        resolve({ id, loaded: true, status: 'Already Loaded' })
      }
      const body = document.body
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.innerHTML = ''
      script.src = url
      script.id = id
      script.onload = () => {
        resolve({ id, loaded: true, status: 'Loaded' })
      }
      // eslint-disable-next-line n/handle-callback-err
      script.onerror = (error: any) => resolve({ id, loaded: false, status: 'Loaded' })
      script.async = true
      script.defer = true
      body.appendChild(script)
    })
  }

  removeScript (id: string): void {
    const script = document.getElementById(id)
    if (script != null) {
      script.remove()
    }
  }
}
