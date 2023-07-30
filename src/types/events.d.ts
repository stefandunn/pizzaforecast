declare global {
  interface GlobalEventHandlersEventMap {
    localStorageChange: CustomEvent<{ key: string; value: any }>;
  }
}

export const createCustomEvent = <T extends keyof GlobalEventHandlersEventMap>(
  type: T,
  eventInitDict: CustomEventInit<
    GlobalEventHandlersEventMap[T] extends CustomEvent<infer T> ? T : never
  >
) => new CustomEvent(type, eventInitDict);
