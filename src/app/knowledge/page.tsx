
import { db } from "@/services/airtable";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { KnowledgeClientPage } from "@/components/knowledge/KnowledgeClientPage";
import type { Resource } from "@/services/airtable";

export default async function KnowledgePage() {
    const cookieStore = cookies();
    const userId = cookieStore.get('aether_user_id')?.value;

    if (!userId) {
        redirect('/login?callbackUrl=/knowledge');
    }

    let resources: Resource[] = [];
    let error: string | null = null;

    try {
        resources = await db.getResources();
    } catch (err) {
        error = "Failed to load resources. Please try again later.";
        console.error(err);
    }
    
    return <KnowledgeClientPage initialResources={resources} initialError={error} />;
}
