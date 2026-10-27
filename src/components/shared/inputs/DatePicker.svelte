<script lang="ts">
	import {
		Calendar,
		ChevronLeft,
		ChevronRight,
	}										from '@lucide/svelte';
	import { DatePicker as BitsDatePicker }	from 'bits-ui';
	import {
		CalendarDate,
		getLocalTimeZone,
		today,
		type DateValue,
	}										from '@internationalized/date';

	export interface DatePickerProps {
		id?			: string;
		value?		: string;
		maxValue?	: DateValue | Date | string;
		minValue?	: DateValue | Date | string;
		disabled?	: boolean;
		class?		: string;
		onchange?	: ( value : string ) => void;
	}

	let {
		id,
		value		= $bindable( '' ),
		maxValue,
		minValue,
		disabled	= false,
		class		: className = '',
		onchange,
	} : DatePickerProps = $props();

	const englishMonths : string[] = [
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

	const spanishMonths : string[] = [
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

	function parseStringToDate( val : string | undefined ): CalendarDate | undefined {
		if ( !val || typeof val !== 'string' ) {
			return undefined;
		}

		const clean = val.trim();
		if ( !clean ) {
			return undefined;
		}

		const isoMatch = clean.match( /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/ );
		if ( isoMatch ) {
			const year	= Number( isoMatch[ 1 ] );
			const month	= Number( isoMatch[ 2 ] );
			const day	= Number( isoMatch[ 3 ] );
			if ( month >= 1 && month <= 12 && day >= 1 && day <= 31 ) {
				return new CalendarDate( year, month, day );
			}
		}

		const englishMatch = clean.match( /^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/ );
		if ( englishMatch ) {
			const monthName	= englishMatch[ 1 ].toLowerCase();
			const dayNum	= Number( englishMatch[ 2 ] );
			const yearNum	= Number( englishMatch[ 3 ] );

			const engIdx = englishMonths.findIndex( ( m : string ) : boolean => m.toLowerCase() === monthName );
			if ( engIdx !== -1 ) {
				return new CalendarDate( yearNum, engIdx + 1, dayNum );
			}

			const spaIdx = spanishMonths.findIndex( ( m : string ) : boolean => m.toLowerCase() === monthName );
			if ( spaIdx !== -1 ) {
				return new CalendarDate( yearNum, spaIdx + 1, dayNum );
			}
		}

		const spanishDeMatch = clean.match( /^(\d{1,2})\s+de\s+([A-Za-z]+)(?:\s+de|,)?\s+(\d{4})$/i );
		if ( spanishDeMatch ) {
			const dayNum	= Number( spanishDeMatch[ 1 ] );
			const monthName	= spanishDeMatch[ 2 ].toLowerCase();
			const yearNum	= Number( spanishDeMatch[ 3 ] );

			const spaIdx = spanishMonths.findIndex( ( m : string ) : boolean => m.toLowerCase() === monthName );
			if ( spaIdx !== -1 ) {
				return new CalendarDate( yearNum, spaIdx + 1, dayNum );
			}
		}

		return undefined;
	}

	function formatDateToEnglish( dateVal : DateValue | undefined ): string {
		if ( !dateVal ) {
			return '';
		}

		const monthName = englishMonths[ dateVal.month - 1 ];
		if ( !monthName ) {
			return '';
		}

		return `${ monthName } ${ dateVal.day }, ${ dateVal.year }`;
	}

	let internalDate	= $state<DateValue | undefined>( parseStringToDate( value ) );
	let lastFormatted	= $state( value || '' );

	$effect( () => {
		const currentVal = value;
		if ( currentVal !== lastFormatted ) {
			const parsed = parseStringToDate( currentVal );
			internalDate = parsed;
			lastFormatted = parsed ? formatDateToEnglish( parsed ) : ( currentVal || '' );
		}
	} );

	function resolveDateValue( val : DateValue | Date | string | undefined ): DateValue | undefined {
		if ( !val ) {
			return undefined;
		}

		if ( val instanceof Date ) {
			return new CalendarDate( val.getFullYear(), val.getMonth() + 1, val.getDate() );
		}

		if ( typeof val === 'object' && 'calendar' in val ) {
			return val as DateValue;
		}

		if ( typeof val === 'string' ) {
			if ( val.toLowerCase() === 'today' ) {
				return today( getLocalTimeZone() );
			}

			return parseStringToDate( val );
		}

		return undefined;
	}

	const resolvedMaxValue = $derived( resolveDateValue( maxValue ) );
	const resolvedMinValue = $derived( resolveDateValue( minValue ) );

	function handleValueChange( nextDate : DateValue | undefined ): void {
		internalDate = nextDate;
		const formatted = formatDateToEnglish( nextDate );
		if ( formatted !== value ) {
			lastFormatted = formatted;
			value = formatted;
			onchange?.( formatted );
		}
	}
</script>

<BitsDatePicker.Root
	locale			= "es"
	weekStartsOn	= { 1 }
	weekdayFormat	= "short"
	fixedWeeks		= { true }
	disabled		= { disabled }
	maxValue		= { resolvedMaxValue }
	minValue		= { resolvedMinValue }
	bind:value		= { internalDate }
	onValueChange	= { handleValueChange }
>
	<BitsDatePicker.Input
		{ id }
		class="flex items-center w-full px-3 py-2 bg-surface rounded-xl border border-border/50 text-text text-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 hover:border-primary/30 disabled:opacity-50 disabled:cursor-not-allowed group { className }"
	>
		{#snippet children({ segments })}
			<div class="flex items-center flex-1">
				{#each segments as { part, value: segmentValue }, i ( part + i )}
					<div class="inline-block select-none">
						{#if part === 'literal'}
							<BitsDatePicker.Segment
								{part}
								class="px-0.5 text-text-muted text-sm select-none"
							>
								{ segmentValue }
							</BitsDatePicker.Segment>
						{:else}
							<BitsDatePicker.Segment
								{part}
								class="rounded px-1.5 py-0.5 text-text text-sm hover:bg-surface-light focus:bg-primary/20 focus:text-primary aria-[valuetext=Empty]:text-text-muted outline-none transition-colors"
							>
								{ segmentValue }
							</BitsDatePicker.Segment>
						{/if}
					</div>
				{/each}
			</div>

			<BitsDatePicker.Trigger
				class="ml-auto inline-flex size-7 items-center justify-center rounded-lg text-text-muted hover:text-primary hover:bg-surface-light transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer disabled:pointer-events-none"
				aria-label="Seleccionar fecha"
			>
				<Calendar class="size-4" />
			</BitsDatePicker.Trigger>
		{/snippet}
	</BitsDatePicker.Input>

	<BitsDatePicker.Portal>
		<BitsDatePicker.Content
			sideOffset	= { 6 }
			class		= "z-50 rounded-2xl border border-border/50 bg-surface/95 backdrop-blur-xl p-3.5 shadow-2xl shadow-black/80 text-text outline-none animate-scale-in"
		>
			<BitsDatePicker.Calendar class="w-full select-none">
				{#snippet children({ months, weekdays })}
					<BitsDatePicker.Header class="flex items-center justify-between pb-2 mb-2 border-b border-border/30">
						<BitsDatePicker.PrevButton
							class="inline-flex size-8 items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-light transition-colors active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer disabled:opacity-30 disabled:pointer-events-none disabled:cursor-not-allowed"
							aria-label="Mes anterior"
						>
							<ChevronLeft class="size-4" />
						</BitsDatePicker.PrevButton>

						<BitsDatePicker.Heading class="text-sm font-semibold text-text capitalize tracking-wide" />

						<BitsDatePicker.NextButton
							class="inline-flex size-8 items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-light transition-colors active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer disabled:opacity-30 disabled:pointer-events-none disabled:cursor-not-allowed"
							aria-label="Mes siguiente"
						>
							<ChevronRight class="size-4" />
						</BitsDatePicker.NextButton>
					</BitsDatePicker.Header>

					<div class="pt-2">
						{#each months as month ( month.value )}
							<BitsDatePicker.Grid class="w-full border-collapse select-none space-y-1">
								<BitsDatePicker.GridHead>
									<BitsDatePicker.GridRow class="mb-1 flex w-full justify-between">
										{#each weekdays as day ( day )}
											<BitsDatePicker.HeadCell class="size-8 text-xs font-semibold text-text-muted flex items-center justify-center uppercase">
												<div>{ day.slice( 0, 2 ) }</div>
											</BitsDatePicker.HeadCell>
										{/each}
									</BitsDatePicker.GridRow>
								</BitsDatePicker.GridHead>

								<BitsDatePicker.GridBody>
									{#each month.weeks as weekDates ( weekDates )}
										<BitsDatePicker.GridRow class="flex w-full justify-between mt-1">
											{#each weekDates as date ( date )}
												<BitsDatePicker.Cell
													{date}
													month	= { month.value }
													class	= "p-0 relative size-8 text-center text-sm"
												>
													<BitsDatePicker.Day
														class="group relative inline-flex size-8 items-center justify-center rounded-lg border border-transparent bg-transparent p-0 text-sm font-normal text-text transition-all duration-150 hover:bg-surface-light hover:border-border/30 focus-visible:ring-2 focus-visible:ring-primary/50 outline-none data-selected:bg-linear-to-r data-selected:from-primary data-selected:to-primary-dark data-selected:text-white data-selected:font-semibold data-selected:shadow-md data-selected:shadow-primary/30 data-disabled:text-text-muted/30 data-disabled:pointer-events-none data-outside-month:text-text-muted/20 data-unavailable:line-through data-unavailable:text-danger/50 cursor-pointer"
													>
														<div class="absolute bottom-1 hidden size-1 rounded-full bg-accent group-data-today:block group-data-selected:bg-white"></div>

														{ date.day }
													</BitsDatePicker.Day>
												</BitsDatePicker.Cell>
											{/each}
										</BitsDatePicker.GridRow>
									{/each}
								</BitsDatePicker.GridBody>
							</BitsDatePicker.Grid>
						{/each}
					</div>
				{/snippet}
			</BitsDatePicker.Calendar>
		</BitsDatePicker.Content>
	</BitsDatePicker.Portal>
</BitsDatePicker.Root>
