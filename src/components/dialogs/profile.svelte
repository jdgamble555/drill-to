<script lang="ts">
	import Button, { Label } from '@smui/button';
	import Dialog, { Title, Content } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import Textfield from '@smui/textfield';
	import { getProfile, updateProfile } from '../../modules/auth';
	import { loading, showProfile } from '../../modules/stores';

	let profile = {
		username: null,
		avatar_url: null,
		website: null
	};
</script>

<Dialog
	bind:open={$showProfile}
	fullscreen
	on:SMUIDialog:opened={() => getProfile().then((_p) => (profile = _p))}
>
	<Content>
		<IconButton on:click={() => showProfile.set(false)} class="right-corner material-icons">
			close
		</IconButton>
		<Title>Edit Profile</Title>
		<center>
			<form on:submit|preventDefault={updateProfile}>
				<p>
					<Textfield
						style="width: 100%;"
						type="text"
						variant="outlined"
						label="Username"
						input$name="username"
						bind:value={profile.username}
						input$emptyValueUndefined
						disabled={$loading}
					/>
				</p>
				<p>
					<Textfield
						style="width: 100%;"
						type="text"
						variant="outlined"
						label="Avatar URL"
						input$name="avatar_url"
						bind:value={profile.avatar_url}
						input$emptyValueUndefined
						disabled={$loading}
					/>
				</p>
				<p>
					<Textfield
						style="width: 100%;"
						type="text"
						variant="outlined"
						label="Website"
						input$name="website"
						bind:value={profile.website}
						input$emptyValueUndefined
						disabled={$loading}
					/>
				</p>
				<br />
				<Button class="dialog-button" type="submit" variant="outlined" disabled={$loading}>
					<Label>{$loading ? 'Loading' : 'Save'}</Label>
				</Button>
				<Button
					type="button"
					on:click={() => showProfile.set(false)}
					class="dialog-button"
					variant="outlined"
					disabled={$loading}
				>
					<Label>Close</Label>
				</Button>
			</form>
		</center>
	</Content>
</Dialog>

<style global>
	.right-corner {
		position: absolute;
		top: 0;
		right: 0;
	}
	.dialog-button {
		background-color: #cfd8dc;
		color: #d81b60;
	}
	.mdc-button {
		text-transform: none;
		padding: 20px;
	}
</style>

