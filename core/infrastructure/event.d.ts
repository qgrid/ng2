export abstract class Event {
  on(handler: (any) => void);

  watch(handler: (any) => void);

  emit(name: string, e: any);
}
