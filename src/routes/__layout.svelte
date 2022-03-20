<script type="ts">
	import { darkMode, showLogin, showProfile, user } from '../modules/stores';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import Dialog_C from '../components/dialogs.svelte';
	import Snackbar_C from '../components/snackbar.svelte';
	import { logout } from '../modules/auth';
	import Button from '@smui/button';

	// https://fonts.google.com/icons?selected=Material+Icons
</script>

<svelte:head>
	<meta
		name="description"
		content="A website with language learning flash cards and spaced repetition!"
	/>
	<link rel="stylesheet" id="theme" href="/smui{$darkMode ? '-dark' : ''}.css" />
</svelte:head>
<Snackbar_C />
<Dialog_C />
<div class="top-app-bar">
	<TopAppBar variant="fixed">
		<Row>
			<Section>
				<IconButton color="secondary" class="material-icons">
					<div class={$darkMode ? 'dark-red' : ''}>favorite</div>
				</IconButton>
				<Title>Drill.to</Title>
			</Section>
			<Section align="end" toolbar>
				<IconButton
					on:click={() => darkMode.set(!$darkMode)}
					class="material-icons"
					aria-label="{$darkMode ? 'Light' : 'Dark'} Mode"
					title="{$darkMode ? 'Light' : 'Dark'} Mode"
				>
					{$darkMode ? 'light_mode' : 'dark_mode'}
				</IconButton>
				{#if !$user}
					<Button aria-label="Login" on:click={() => showLogin.set(!$showLogin)} title="Login">
						Login
					</Button>
				{:else}
					<IconButton
						class="material-icons"
						aria-label="Logout"
						on:click={() => showProfile.set(!$showProfile)}
						title="Profile"
					>
						account_box
					</IconButton>
					<Button aria-label="Logout" on:click={logout} title="logout">Logout</Button>
				{/if}
			</Section>
		</Row>
	</TopAppBar>
</div>
<div class="s-container {$darkMode ? 'dark' : 'light'}-theme">
	<slot />
</div>

<style global>
	.s-container {
		max-width: 995px;
		width: 100%;
		background-color: transparent !important;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	.dark-red {
		color: #d81b60;
	}
	.top-app-bar {
		height: 60px;
	}
</style>
