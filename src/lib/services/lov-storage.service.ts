import { STORAGE_KEYS }		from '$lib/constants/storage-keys';
import {
	getStorageItem,
	setStorageItem,
	isDataEqual,
}							from '$lib/utils/storage';
import type { ILovParent }	from '$lib/types';

export interface ISyncResult {
	hasChanged	: boolean;
	previous	: ILovParent[] | null;
	current		: ILovParent[];
}

export class LovStorageService {
	public getStoredParents(): ILovParent[] | null {
		return getStorageItem<ILovParent[]>( STORAGE_KEYS.LOV_PARENTS );
	}

	public setStoredParents( parents : ILovParent[] ): boolean {
		return setStorageItem<ILovParent[]>( STORAGE_KEYS.LOV_PARENTS, parents );
	}

	public addStoredParent( parent : ILovParent ): void {
		const existing = this.getStoredParents() ?? [];
		const updated = [ ...existing, parent ];
		this.setStoredParents( updated );
	}

	public updateStoredParent( id : number | string, patch : Partial<ILovParent> ): void {
		const existing = this.getStoredParents();
		if ( !existing ) return;

		const updated = existing.map( ( item ): ILovParent => {
			if ( item.id === Number( id ) ) {
				return { ...item, ...patch };
			}
			return item;
		} );

		this.setStoredParents( updated );
	}

	public removeStoredParent( id : number | string ): void {
		const existing = this.getStoredParents();
		if ( !existing ) return;

		const updated = existing.filter( ( item ): boolean => item.id !== Number( id ) );
		this.setStoredParents( updated );
	}

	public syncParentsIfChanged( incoming : ILovParent[] ): ISyncResult {
		const existing = this.getStoredParents();

		if ( !existing ) {
			this.setStoredParents( incoming );
			return {
				hasChanged	: true,
				previous	: null,
				current		: incoming,
			};
		}

		if ( isDataEqual( existing, incoming ) ) {
			return {
				hasChanged	: false,
				previous	: existing,
				current		: existing,
			};
		}

		this.setStoredParents( incoming );
		return {
			hasChanged	: true,
			previous	: existing,
			current		: incoming,
		};
	}
}

export const lovStorage : LovStorageService = new LovStorageService();
