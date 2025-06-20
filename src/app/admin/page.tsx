import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Admin Panel</CardTitle>
          <CardDescription>
            Select an option from the sidebar to manage your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>You can manage categories, sub-categories, and products.</p>
        </CardContent>
      </Card>
    </div>
  );
}
