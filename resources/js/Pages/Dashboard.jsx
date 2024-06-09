import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import RootLayout from '@/Layouts/RootLayout'
import { Head } from '@inertiajs/react'

export default function Dashboard({ auth }) {
    return (
        <RootLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="h-screen grow sm:px-6 lg:px-8"></div>
        </RootLayout>
    )
}
