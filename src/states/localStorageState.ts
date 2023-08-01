"use client";

import { getOrElse } from "@/utils/helpers";

export type LocalStorageChangeEvent = CustomEvent<{ key: string; value: any }>;
export type LocalStorageChangeHandler = (e: LocalStorageChangeEvent) => unknown;

class LocalStorageState {
  store?: Storage;

  constructor() {
    if (typeof window !== "undefined") {
      this.store = getOrElse(() => window.localStorage);
      if (!this.store) {
        throw new Error("Browser does not support local storage.");
      }
    }
  }

  set(key: string, value: any) {
    this.store?.setItem(key, JSON.stringify(value));
    const event = new CustomEvent("localStorageChange", {
      cancelable: true,
      detail: { key, value },
    });

    document.dispatchEvent(event);
  }

  get<T>(key: string, fallback?: T): T | undefined {
    const item = this.store?.getItem(key);
    if (!item) return fallback || undefined;
    return typeof item === "string" ? JSON.parse(item) : item;
  }

  remove(key: string) {
    this.store?.removeItem(key);
  }

  addOnChangeListener(handler: LocalStorageChangeHandler) {
    document.addEventListener("localStorageChange", handler, false);
  }

  removeOnChangeListener(handler: LocalStorageChangeHandler) {
    document.removeEventListener("localStorageChange", handler, false);
  }
}

export const localStorageState = new LocalStorageState();
