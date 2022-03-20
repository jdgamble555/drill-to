import { loading, resourcesStore, resourceStore, snackStore } from "./stores";
import { supabase } from "./supabase";

export interface Resource {
    id?: string
    title: string;
    description: string;
    url: string;
};

const messages = {
    ADD_SUCCESS: 'The resource was successfully added!',
    UPDATE_SUCCESS: 'The resource was successfully updated!'
};

export async function addResource(e: any): Promise<void> {
    loading.set(true);
    const form = new FormData(e.target);
    const { title, description, url } = Object.fromEntries(form);
    const { error } = await supabase.from('resources').insert({
        title,
        description,
        url
    }, { returning: 'minimal' });
    loading.set(false);
    error
        ? snackStore.showMsg(error.message)
        : snackStore.showMsg(messages.ADD_SUCCESS);

    // reset state
    resourcesStore.set(await getResources());
    resourceStore.reset();
}

export async function getResources(): Promise<Resource[]> {
    loading.set(true);
    const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
    loading.set(false);
    if (error) {
        snackStore.showMsg(error.message);
        return;
    }
    return data;
}

export async function getResource(id: string) {
    loading.set(true);
    const { data, error } = await supabase
        .from('resources')
        .select('*')
        .filter('id', 'eq', id)
        .single();
    loading.set(false);
    if (error) {
        snackStore.showMsg(error.message);
        return;
    }
    return data;
}

export async function updateResource(e: any): Promise<void> {
    loading.set(true);
    const form = new FormData(e.target);
    const { id, title, description, url } = Object.fromEntries(form);
    const { error } = await supabase.from('resources').upsert({
        id,
        title,
        description,
        url
    }, { returning: 'minimal' });
    error
        ? snackStore.showMsg(error.message)
        : snackStore.showMsg(messages.UPDATE_SUCCESS);

    // reset state
    resourcesStore.set(await getResources());
    resourceStore.reset();
}

export async function deleteResource(e: any): Promise<void> {
    loading.set(true);
    const form = new FormData(e.target);
    const { id } = Object.fromEntries(form);
    const { error } = await supabase.from('resources').delete().match({ id });
    error
        ? snackStore.showMsg(error.message)
        : snackStore.showMsg(messages.UPDATE_SUCCESS);

    // reset state
    resourcesStore.set(await getResources());
    resourceStore.reset();
}
