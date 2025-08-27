
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const cookieStore = cookies();
        cookieStore.delete('aether_user_id');
        cookieStore.delete('aether_user_name');

        return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred during logout' }, { status: 500 });
    }
}
