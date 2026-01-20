export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
            <h1 className="text-2xl font-bold">Welcome to SaaSAuto Dashboard</h1>
            <p className="text-muted-foreground max-w-md">
                Select an industry module from the sidebar to view the specific dashboard implementation.
            </p>
        </div>
    )
}
