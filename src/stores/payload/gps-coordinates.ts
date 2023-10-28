import { writable } from 'svelte/store';

export interface IAltitude {
  value: number[];
  time: string[];
}

function createGpsCoordinatesStore() {
  const { subscribe, set, update } = writable<IAltitude>({
    value: [],
    time: []
  });

  return {
    subscribe,
    update: ({ time, value }: { time: string; value: number }) =>
      update(($data) => {
        $data.value = [...$data.value, value];
        $data.time = [...$data.time, time];
        return $data;
      }),
    reset: () => set({ value: [], time: [] })
  };
}

const gpsCoordinatesStore = createGpsCoordinatesStore();
export default gpsCoordinatesStore;