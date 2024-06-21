import { RpgSceneMap, RpgModule } from '@rpgjs/client';

import { useAuthStore } from '../services/auth.service';
import { LoginRequest } from '../types/interfaces/auth.interface';


@RpgModule<RpgSceneMap>({
  id: 'login',
  scene: [LoginScene],
})
export default class LoginScene extends RpgSceneMap {
  private nickNameInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;
  private loginButton: HTMLButtonElement;
  private authStore = useAuthStore();

  onCreate () {
    this.nickNameInput = this.createInput(100, 100, 'Nickname');
    this.passwordInput = this.createInput(100, 140, 'Password', 'password');

    this.loginButton = this.add.text(100, 180, 'Login').setInteractive();
    this.loginButton.on('pointerdown', () => {
      this.handleLogin();
    });
  }

  createInput (x: number, y: number, placeholder: string, type = 'text'): HTMLInputElement {
    const input = document.createElement('input');

    input.type = type;
    input.placeholder = placeholder;
    input.style.position = 'absolute';
    input.style.left = `${x}px`;
    input.style.top = `${y}px`;
    document.body.append(input);
    return input;
  }

  async handleLogin () {
    const nickName = this.nickNameInput.value;
    const password = this.passwordInput.value;

    const credentials: LoginRequest = { nickName, password };

    try {
      await this.authStore.login(credentials);

      if (this.authStore.error) {
        throw new Error(this.authStore.error);
      }

      this.scene.switch('main');
    } catch (error) {
      console.error(error);
      alert('Login failed: ' + error.message);
    }
  }

  onRemove () {
    this.nickNameInput.remove();
    this.passwordInput.remove();
  }
}
