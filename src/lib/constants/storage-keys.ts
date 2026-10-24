export const STORAGE_KEYS = {
	LOV_PARENTS	: 'portfolio_lov_parents_v1',
} as const;

export type StorageKey = ( typeof STORAGE_KEYS )[ keyof typeof STORAGE_KEYS ];
