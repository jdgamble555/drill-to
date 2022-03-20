import { getResources } from "../modules/resource";

export async function get() {
    return {
        body: await getResources()
    };
}