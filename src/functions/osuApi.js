import { v2, auth } from 'osu-api-extended';

export const hello = 'world';
export async function execute() {
    await auth.login(osu_client_id, osu_client_secret);

    const user = await v2.user.details(11212255, 'osu');
    console.log(user);
}