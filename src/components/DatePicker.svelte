<script lang="ts">
	import { Select } from './shared';

	interface Props {
		value?		: string;
		onchange?	: ( value : string ) => void;
	}

	let {
		value		= $bindable( '' ),
		onchange,
	} : Props = $props();

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const currentYear	= new Date().getFullYear();
	const years			= Array.from( { length : 15 }, ( _, i : number ) : string => String( currentYear - 10 + i ) );
	const days			= Array.from( { length : 31 }, ( _, i : number ) : string => String( i + 1 ) );

	function parseDateParts( val : string ): { month : string; day : string; year : string } {
		if ( !val ) return { month : '', day : '', year : '' };

		const match = val.match( /(\w+)\s+(\d+),\s+(\d+)/ );
		if ( match ) {
			return {
				month	: match[ 1 ],
				day		: match[ 2 ],
				year	: match[ 3 ],
			};
		}

		const isoMatch = val.match( /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/ );
		if ( isoMatch ) {
			const monthIdx = Number( isoMatch[ 2 ] ) - 1;
			if ( monthIdx >= 0 && monthIdx < months.length ) {
				return {
					month	: months[ monthIdx ],
					day		: String( Number( isoMatch[ 3 ] ) ),
					year	: isoMatch[ 1 ],
				};
			}
		}

		return { month : '', day : '', year : '' };
	}

	const initialParts	= parseDateParts( value );
	let selectedMonth	= $state( initialParts.month );
	let selectedDay		= $state( initialParts.day );
	let selectedYear	= $state( initialParts.year );

	$effect( () => {
		const parts		= parseDateParts( value );
		selectedMonth	= parts.month;
		selectedDay		= parts.day;
		selectedYear	= parts.year;
	} );

	function updateValue(): void {
		if ( selectedMonth && selectedDay && selectedYear ) {
			value = `${ selectedMonth } ${ selectedDay }, ${ selectedYear }`;
			onchange?.( value );
		}
	}

	function handleMonthChange( nextMonth : string ): void {
		selectedMonth = nextMonth;
		updateValue();
	}

	function handleDayChange( nextDay : string ): void {
		selectedDay = nextDay;
		updateValue();
	}

	function handleYearChange( nextYear : string ): void {
		selectedYear = nextYear;
		updateValue();
	}
</script>

<div class="flex items-center gap-2">
	<div class="flex-1">
		<Select
			bind:value	= { selectedMonth }
			items		= { months }
			placeholder	= "Mes"
			onchange	= { handleMonthChange }
		/>
	</div>

	<div class="w-24">
		<Select
			bind:value	= { selectedDay }
			items		= { days }
			placeholder	= "Día"
			onchange	= { handleDayChange }
		/>
	</div>

	<div class="w-28">
		<Select
			bind:value	= { selectedYear }
			items		= { years }
			placeholder	= "Año"
			onchange	= { handleYearChange }
		/>
	</div>
</div>
