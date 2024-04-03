import { Spritesheet, Animation, Direction } from '@rpgjs/client';


const frameY = (direction) => {
  return {
    [Direction.Down]: 0,
    [Direction.Left]: 1,
    [Direction.Right]: 2,
    [Direction.Up]: 3,
  }[direction];
};

@Spritesheet({
  framesWidth: 3,
  framesHeight: 4,
  textures: {
    [Animation.Stand]: {
      animations: (direction) => [
        [{ time: 0, frameX: 1, frameY: frameY(direction) }],
      ],
    },
    [Animation.Walk]: {
      animations: (direction) => [
        [
          { time: 0, frameX: 0, frameY: frameY(direction) },
          { time: 10, frameX: 1, frameY: frameY(direction) },
          { time: 20, frameX: 2, frameY: frameY(direction) },
          { time: 40 }, // indicate the last time at the end of the animation. This time is in fact the final duration of the animation.
        ],
      ],
    },
  },
})
export default class Characters {}
