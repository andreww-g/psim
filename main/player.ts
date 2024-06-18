import { RpgPlayer, RpgPlayerHooks, Control, Components } from '@rpgjs/server';


const player: RpgPlayerHooks = {
  onConnected (player: RpgPlayer) {
    player.name = 'Wizard';
    player.setGraphic('hero');
    player.setComponentsTop(Components.text('{name}', {
      fill: '#000000',
      fontSize: 20,
    }));
    player.setComponentsTop(
      Components.hpBar(), {
        width: 42,
      });
  },
  onInput (player: RpgPlayer, { input }) {
    if (input == Control.Back) {
      player.callMainMenu();
    }
  },
  async onJoinMap (player: RpgPlayer) {
    if (player.getVariable('AFTER_INTRO')) {
      return;
    }
    await player.showText('Projektowanie systemów internetowych i mobilnych');
    await player.showText('Projekt dla gierki w stylu Final Fantasy');
    await player.showText('Kliknij ENTER żeby zacząć');
    player.setVariable('AFTER_INTRO', true);
  },
};

export default player;
