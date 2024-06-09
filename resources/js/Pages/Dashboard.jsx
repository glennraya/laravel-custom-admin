import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import RootLayout from '@/Layouts/RootLayout'
import { Head } from '@inertiajs/react'

export default function Dashboard({ auth }) {
    return (
        <RootLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="container mx-auto h-screen sm:px-6 lg:px-8"></div>
        </RootLayout>
    )
}
