<script>
	import Button, { Label } from '@smui/button';
	import Card, { Content } from '@smui/card';
	import { resourceStore } from '../../modules/stores';
</script>

<Card variant="outlined" padded>
	<Content>
		<div class="text-center">
			<Button color="secondary" on:click={resourceStore.add} variant="raised">
				<Label>Add Resource</Label>
			</Button>
		</div>
	</Content>
</Card>

<style>
	.text-center {
		text-align: center;
	}
</style>
