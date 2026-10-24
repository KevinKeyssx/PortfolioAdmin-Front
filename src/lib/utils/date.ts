const MONTH_NAMES = [
	'enero',
	'febrero',
	'marzo',
	'abril',
	'mayo',
	'junio',
	'julio',
	'agosto',
	'septiembre',
	'octubre',
	'noviembre',
	'diciembre',
];

/**
 * Formatea una fecha al formato español: "24 de enero 2023"
 *
 * @param dateInput - Fecha en formato string (ISO o YYYY-MM-DD), Date, o nulo
 * @returns Cadena con el formato "DD de mes YYYY" o "N/A" si es inválido
 */
export function formatDate( dateInput : string | Date | null | undefined ): string {
	if ( !dateInput ) return 'N/A';

	if ( typeof dateInput === 'string' ) {
		const match = dateInput.match( /^(\d{4})-(\d{1,2})-(\d{1,2})/ );
		if ( match ) {
			const year	= match[ 1 ];
			const month	= parseInt( match[ 2 ], 10 ) - 1;
			const day	= parseInt( match[ 3 ], 10 );

			if ( month >= 0 && month < 12 ) {
				return `${ day } de ${ MONTH_NAMES[ month ] } ${ year }`;
			}
		}
	}

	const date = typeof dateInput === 'string' ? new Date( dateInput ) : dateInput;
	if ( isNaN( date.getTime() ) ) return 'N/A';

	const day	= date.getDate();
	const month	= MONTH_NAMES[ date.getMonth() ];
	const year	= date.getFullYear();

	return `${ day } de ${ month } ${ year }`;
}
