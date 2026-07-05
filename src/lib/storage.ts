import { useEffect, useState } from "react";

export type PersistedCollectionName =
  | "orders"
  | "products"
  | "inventory"
  | "insights"
  | "factories"
  | "user";

interface PersistedEnvelope {
  version: number;
  updatedAt: string;
  data: Record<string, unknown>;
}

export class StorageService {
  private readonly storageKey: string;
  private readonly version: number;
  private initialized = false;
  private envelope: PersistedEnvelope;
  private readonly listeners = new Set<() => void>();

  constructor(defaultData: Record<string, unknown> = {}, storageKey = "konic-os-store-v1") {
    this.storageKey = storageKey;
    this.version = 1;
    this.envelope = {
      version: this.version,
      updatedAt: "",
      data: { ...defaultData },
    };
  }

  private ensureInitialized() {
    if (this.initialized || typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PersistedEnvelope>;
        this.envelope = {
          version: parsed.version ?? this.version,
          updatedAt: parsed.updatedAt ?? "",
          data: {
            ...this.envelope.data,
            ...(parsed.data ?? {}),
          },
        };
      } else {
        this.envelope.updatedAt = new Date().toISOString();
        this.persist();
      }
    } catch {
      this.envelope.updatedAt = new Date().toISOString();
      this.persist();
    }

    this.initialized = true;
    this.emit();
  }

  private persist() {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(this.storageKey, JSON.stringify(this.envelope));
  }

  private emit() {
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getValue<T>(key: PersistedCollectionName, fallback: T): T {
    this.ensureInitialized();
    const value = this.envelope.data[key];
    return value === undefined ? fallback : (value as T);
  }

  setValue<T>(key: PersistedCollectionName, value: T) {
    this.ensureInitialized();
    this.envelope.data[key] = value;
    this.envelope.updatedAt = new Date().toISOString();
    this.persist();
    this.emit();
  }

  getCollection<T extends { id: string }>(key: PersistedCollectionName, fallback: T[]): T[] {
    const value = this.getValue<T[]>(key, fallback);
    return Array.isArray(value) ? value : fallback;
  }

  setCollection<T extends { id: string }>(key: PersistedCollectionName, value: T[]) {
    this.setValue(key, value);
  }

  createItem<T extends { id: string }>(
    key: PersistedCollectionName,
    input: Partial<T> & Record<string, unknown>,
    fallback: T[] = [],
  ): T {
    const item = {
      ...input,
      id: input.id ?? `${key}-${Date.now()}`,
      createdAt: input.createdAt ?? new Date().toISOString(),
    } as unknown as T;

    const current = this.getCollection(key, fallback);
    this.setCollection(key, [item, ...current]);
    return item;
  }

  updateItem<T extends { id: string }>(
    key: PersistedCollectionName,
    id: string,
    patch: Partial<T>,
    fallback: T[] = [],
  ): T | null {
    const current = this.getCollection(key, fallback);
    const index = current.findIndex((item) => item.id === id);

    if (index < 0) {
      return null;
    }

    const updated = { ...current[index], ...patch } as T;
    const next = current.map((item) => (item.id === id ? updated : item));
    this.setCollection(key, next);
    return updated;
  }

  removeItem<T extends { id: string }>(key: PersistedCollectionName, id: string, fallback: T[] = []): boolean {
    const current = this.getCollection(key, fallback);
    const next = current.filter((item) => item.id !== id);

    if (next.length === current.length) {
      return false;
    }

    this.setCollection(key, next);
    return true;
  }
}

export function createStorageService(defaultData: Record<string, unknown> = {}) {
  return new StorageService(defaultData);
}

export function usePersistedCollection<T extends { id: string }>(
  storage: StorageService,
  key: PersistedCollectionName,
  fallback: T[],
) {
  const [items, setItems] = useState<T[]>(() => storage.getCollection(key, fallback));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(storage.getCollection(key, fallback));
    setReady(true);

    const unsubscribe = storage.subscribe(() => {
      setItems(storage.getCollection(key, fallback));
    });

    return () => {
      unsubscribe();
    };
  }, [fallback, key, storage]);

  return {
    items,
    ready,
    setItems: (next: T[]) => storage.setCollection(key, next),
    create: (input: Partial<T> & Record<string, unknown>) =>
      storage.createItem(key, input, fallback),
    update: (id: string, patch: Partial<T>) => storage.updateItem(key, id, patch, fallback),
    remove: (id: string) => storage.removeItem(key, id, fallback),
  };
}

export function usePersistedValue<T>(storage: StorageService, key: PersistedCollectionName, fallback: T) {
  const [value, setValue] = useState<T>(() => storage.getValue(key, fallback));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setValue(storage.getValue(key, fallback));
    setReady(true);

    const unsubscribe = storage.subscribe(() => {
      setValue(storage.getValue(key, fallback));
    });

    return () => {
      unsubscribe();
    };
  }, [fallback, key, storage]);

  return {
    value,
    ready,
    set: (next: T) => storage.setValue(key, next),
  };
}
