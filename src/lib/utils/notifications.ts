import toast, { type ToastOptions }	from 'svelte-french-toast';

export interface ToastThemeConfig {
	duration	: number;
	style		: string;
}

export const TOAST_STYLE : string =
	'background: rgba( 21, 29, 51, 0.95 );' +
	'color: #eef2ff;' +
	'border: 1px solid rgba( 124, 58, 237, 0.3 );' +
	'backdrop-filter: blur( 14px );' +
	'box-shadow: 0 10px 30px -5px rgba( 0, 0, 0, 0.5 ), inset 0 1px 0 rgba( 167, 139, 250, 0.15 );' +
	'border-radius: 14px;' +
	'padding: 12px 18px;' +
	'font-size: 0.875rem;' +
	'font-family: inherit;';

export function notifySuccess( message : string, options? : ToastOptions ): string {
	return toast.success( message, ({
		style		: TOAST_STYLE,
		iconTheme	: {
			primary		: '#06d6a0',
			secondary	: '#0c1222',
		},
		...( options ?? {} ),
	}) );
}

export function notifyError( message : string, options? : ToastOptions ): string {
	return toast.error( message, ({
		style		: TOAST_STYLE,
		iconTheme	: {
			primary		: '#f43f5e',
			secondary	: '#0c1222',
		},
		...( options ?? {} ),
	}) );
}

export function notifyLoading( message : string, options? : ToastOptions ): string {
	return toast.loading( message, ({
		style	: TOAST_STYLE,
		...( options ?? {} ),
	}) );
}

export function notifyInfo( message : string, options? : ToastOptions ): string {
	return toast( message, ({
		style	: TOAST_STYLE,
		icon	: 'ℹ️',
		...( options ?? {} ),
	}) );
}

export function dismissToast( toastId? : string ): void {
	toast.dismiss( toastId );
}
