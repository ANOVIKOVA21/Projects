import { startCarEngine, stopCarEngine, switchToDriveMode } from './request';
import { updateBtnsBehavior } from './listeners';

export function checkAnimation() {
  const carCards = Array.from(document.querySelectorAll<HTMLElement>('.car-card'));
  const animIsNotRun = Array.from(carCards).every((card) => card.dataset.animIsRun == 'false');
  if (animIsNotRun) updateBtnsBehavior('activeWinnersBtn');
  return animIsNotRun;
}
interface GetPhysicsParameters {
  velocity: number;
  distance: number;
}
export interface GetSuccessCars {
  id: number;
  name: string;
  time: number;
}
export async function startAnimation(id: number, carCard: HTMLDivElement | null): Promise<GetSuccessCars | void> {
  const physicsParameters: GetPhysicsParameters = await startCarEngine(id);
  const timeMs = physicsParameters.distance / physicsParameters.velocity;
  const carImg: HTMLElement | null = document.querySelector(`[data-car-num='${id}']`);

  carImg && (carImg.style.transition = `left ${timeMs}ms cubic-bezier(0, 0, 1, 1)`);
  const padding = 20;
  const widthCarImg = carImg?.clientWidth;
  const width = carCard && carCard.clientWidth - padding - (widthCarImg ? widthCarImg : 0);
  carImg && (carImg.style.left = `${width}px`);
  carCard && (carCard.dataset.animIsRun = 'true');
  const res = await switchToDriveMode(id);
  carCard && (carCard.dataset.animIsRun = 'false');
  checkAnimation();
  if (res.success) {
    const timeSec = Number((timeMs / 1000).toFixed(2));
    console.log(timeSec);
    return { id: id, name: carCard?.querySelector('.car-card__name')?.innerHTML as string, time: timeSec };
  } else {
    const computedStyle = window.getComputedStyle(carImg as HTMLElement);
    const left = computedStyle.getPropertyValue('left');
    carImg && (carImg.style.left = left);
    carImg && (carImg.style.transition = `none`);
  }
}
export async function stopAnimation(id: number) {
  const carImg: HTMLElement | null = document.querySelector(`[data-car-num='${id}']`);
  const velocity = (await stopCarEngine(id)).velocity;
  if (velocity == 0) {
    carImg && (carImg.style.transition = `none`);
    carImg && (carImg.style.left = '0');
  }
}
