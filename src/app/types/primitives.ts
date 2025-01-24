export type PrimitiveType = "file" | "issue" | "pr";

export interface PrimitiveItem {
  title: string;
  type: PrimitiveType;
  number?: number;
  path?: string;
}

export type PrimitiveData = Record<PrimitiveType, PrimitiveItem[]>;
