import PrivateRoute from "@/components/PrivateRoute"
import StudioForm from "@/components/studio/StudioForm"

export const metadata = { title: "Add New Studio | StudioSpace" }

export default function AddStudioPage() {
    return (
        <PrivateRoute>
            <section className="mx-auto max-w-4xl px-4 py-10 md:px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Add New Studio</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        List your creative space and start welcoming creators.
                    </p>
                </div>
                <StudioForm />
            </section>
        </PrivateRoute>
    )
}