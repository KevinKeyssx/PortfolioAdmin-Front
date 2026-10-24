import LZString		from 'lz-string';
import { browser }	from '$app/environment';

export interface IStorageResult<T> {
	success	: boolean;
	data?	: T;
	error?	: string;
}

export function isDataEqual<T>( a : T, b : T ): boolean {
	try {
		return JSON.stringify( a ) === JSON.stringify( b );
	} catch {
		return false;
	}
}

export function getStorageItem<T>( key : string ): T | null {
	if ( !browser ) return null;

	try {
		const raw = localStorage.getItem( key );
		if ( !raw ) return null;

		const decompressed = LZString.decompressFromUTF16( raw );
		if ( !decompressed ) return null;

		return JSON.parse( decompressed ) as T;
	} catch ( err : unknown ) {
		const message = err instanceof Error ? err.message : 'Error desconocido al leer de localStorage';
		console.warn( `[storage] Error al leer la clave "${ key }":`, message );
		return null;
	}
}

export function setStorageItem<T>( key : string, value : T ): boolean {
	if ( !browser ) return false;

	try {
		const jsonString = JSON.stringify( value );
		const compressed = LZString.compressToUTF16( jsonString );
		localStorage.setItem( key, compressed );
		return true;
	} catch ( err : unknown ) {
		const message = err instanceof Error ? err.message : 'Error desconocido al guardar en localStorage';
		console.warn( `[storage] Error al guardar la clave "${ key }":`, message );
		return false;
	}
}

export function removeStorageItem( key : string ): void {
	if ( !browser ) return;

	try {
		localStorage.removeItem( key );
	} catch ( err : unknown ) {
		const message = err instanceof Error ? err.message : 'Error desconocido al eliminar de localStorage';
		console.warn( `[storage] Error al eliminar la clave "${ key }":`, message );
	}
}
