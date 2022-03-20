import { loading, showProfile, snackStore } from "./stores";
import { supabase } from "./supabase";

export interface Profile {
    username: string;
    website: string;
    avatar_url: string;
};

const messages = {
    EMAIL_SENT: 'Check your email for the login link!',
    LOGIN_SUCCESS: 'You have been successfully logged in!',
    LOGOUT_SUCCESS: 'You have been successfully logged out!',
    UPDATE_SUCCESS: 'Your profile has been successfully updated!'
};

// authentication methods

export async function login({ email }: { email: string }): Promise<void> {
    loading.set(true);
    const { error } = await supabase.auth.signIn({ email });
    error
        ? snackStore.showMsg(error.message)
        : snackStore.showMsg(messages.EMAIL_SENT);
    loading.set(false);
};

export async function loginWithGoogle(): Promise<void> {
    loading.set(true);
    const { error } = await supabase.auth.signIn({ provider: 'google' });
    error
        ? snackStore.showMsg(error.message)
        : snackStore.showMsg(messages.LOGIN_SUCCESS);
    loading.set(false);
}

export async function logout(): Promise<void> {
    loading.set(true);
    const { error } = await supabase.auth.signOut();
    error
        ? snackStore.showMsg(error.message)
        : snackStore.showMsg(messages.LOGOUT_SUCCESS);
    loading.set(false);
}

// profile methods

export async function getProfile(): Promise<Profile> {
    loading.set(true);
    const user = supabase.auth.user();
    const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single();
    if (error && status !== 406) snackStore.showMsg(error.message);
    loading.set(false);
    if (data) return data;
}

export async function updateProfile(e: any): Promise<void> {
    loading.set(true);
    const form = new FormData(e.target);
    const { username, website, avatar_url } = Object.fromEntries(form);
    const user = supabase.auth.user();
    const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        username,
        website,
        avatar_url
    }, { returning: 'minimal' });
    error
        ? snackStore.showMsg(error.message)
        : snackStore.showMsg(messages.UPDATE_SUCCESS);
    loading.set(false);
    showProfile.set(false);
}
