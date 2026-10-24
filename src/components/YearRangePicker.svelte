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

	let startYear	= $state( value ? value.split( ' - ' )[ 0 ] || '' : '' );
	let endYear		= $state( value ? value.split( ' - ' )[ 1 ] || '' : '' );

	const currentYear	= new Date().getFullYear();
	const years			= Array.from( { length : 30 }, ( _, i : number ) : string => String( currentYear - 25 + i ) );
	const endYears		= [ 'Actual', ...years ];

	$effect( () => {
		if ( !value ) {
			startYear	= '';
			endYear		= '';
			return;
		}

		const [ start, end ] = value.split( ' - ' );

		startYear	= start || '';
		endYear		= end || '';
	} );

	function updateValue(): void {
		value = startYear && endYear
			? `${ startYear } - ${ endYear }`
			: startYear || '';

		onchange?.( value );
	}

	function handleStartChange( nextStart : string ): void {
		startYear = nextStart;
		updateValue();
	}

	function handleEndChange( nextEnd : string ): void {
		endYear = nextEnd;
		updateValue();
	}
</script>

<div class="flex items-center gap-3">
	<div class="flex-1">
		<Select
			bind:value	= { startYear }
			items		= { years }
			placeholder	= "Desde"
			onchange	= { handleStartChange }
		/>
	</div>

	<span class="text-text-muted">-</span>

	<div class="flex-1">
		<Select
			bind:value	= { endYear }
			items		= { endYears }
			placeholder	= "Hasta"
			onchange	= { handleEndChange }
		/>
	</div>
</div>
