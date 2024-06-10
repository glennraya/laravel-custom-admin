import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import RootLayout from '@/Layouts/RootLayout'
import { Head } from '@inertiajs/react'

export default function Dashboard({ auth }) {
    return (
        <RootLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="container mx-auto h-screen p-8 text-lg sm:px-6 lg:px-8">
                Laborum aliqua velit excepteur irure enim ut amet sint fugiat
                velit reprehenderit elit. Ea laborum quis ea consequat eiusmod.
                Dolore dolore deserunt dolore enim aute mollit Lorem excepteur.
                <br />
                <br />
                Nisi mollit sunt eiusmod exercitation. Eu velit cillum commodo
                consequat velit consequat nostrud commodo adipisicing deserunt.
                Excepteur voluptate eiusmod in veniam esse Lorem aute laborum
                sunt.
            </div>
        </RootLayout>
    )
}
