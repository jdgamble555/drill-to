<script lang="ts">
	import Button, { Label } from '@smui/button';
	import { Title, Content } from '@smui/dialog';
	import Dialog from '@smui/dialog';
	import { Separator } from '@smui/list';
	import Textfield from '@smui/textfield';
	import { login, loginWithGoogle } from '../../modules/auth';
	import { loading, showLogin } from '../../modules/stores';

	let email: string;
</script>

<Dialog bind:open={$showLogin}>
	<Title>Login</Title>
	<Content>
		<center>
			<form on:submit|preventDefault={() => login({ email })}>
				<p>Sign in via magic link with your email below</p>
				<div>
					<Textfield
						type="email"
						variant="outlined"
						label="Email"
						bind:value={email}
						input$emptyValueUndefined
					/>
				</div>
				<br />
				<Button class="color-red" type="submit" variant="outlined" disabled={$loading}>
					<Label>{$loading ? 'Loading' : 'Send magic link'}</Label>
				</Button>
			</form>
			<br />
			<Separator />
			<br />
			OR
			<br />
			<br />
			<Button style="background-color: red" variant="raised" on:click={() => loginWithGoogle()}>
				Login with Google
			</Button>
		</center>
	</Content>
</Dialog>
