"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Trash2,
  Mail,
  Phone,
  User,
  Package,
  MessageSquare,
  Calendar,
  MoreHorizontal,
  Eye,
  Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { getApiUrl, cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface Submission {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string | null;
  phone: string;
  product_details: string | null;
  message: string | null;
  submitted_at: string;
}

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
}) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="text-muted-foreground mt-1">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        <p className="text-sm text-gray-600 break-words">{value}</p>
      </div>
    </div>
  );
};

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const apiUrl = getApiUrl();
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search);

    try {
      const res = await fetch(
        `${apiUrl}/contact-submissions?${queryParams.toString()}`
      );
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
        if (
          data.length > 0 &&
          !data.some((d: Submission) => d.id === selectedSubmission?.id)
        ) {
          setSelectedSubmission(data[0]);
        } else if (data.length === 0) {
          setSelectedSubmission(null);
        }
      } else {
        console.error("Failed to fetch submissions");
        toast.error("Could not fetch submissions.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching submissions.");
    } finally {
      setLoading(false);
    }
  }, [search, selectedSubmission?.id]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search, fetchData]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this submission?"))
      return;

    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/contact-submissions/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Submission deleted successfully.");
      const newSubmissions = submissions.filter((sub) => sub.id !== id);
      if (selectedSubmission?.id === id) {
        if (newSubmissions.length > 0) {
          const currentIndex = submissions.findIndex((sub) => sub.id === id);
          const nextIndex = Math.max(0, currentIndex - 1);
          setSelectedSubmission(newSubmissions[nextIndex]);
        } else {
          setSelectedSubmission(null);
        }
      }
      setSubmissions(newSubmissions);
    } else {
      toast.error("Failed to delete submission.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="grid md:grid-cols-[1fr_400px] gap-8 items-start">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold">Contact Submissions</h1>
            <p className="text-muted-foreground">
              Review and manage inquiries from your contact page.
            </p>
          </div>
          <Card>
            <CardHeader>
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-4 w-48 mt-2" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="h-5 w-24" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="h-8 w-8 ml-auto" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : submissions.length > 0 ? (
                    submissions.map((sub) => (
                      <TableRow
                        key={sub.id}
                        onClick={() => setSelectedSubmission(sub)}
                        className={cn(
                          "cursor-pointer",
                          selectedSubmission?.id === sub.id &&
                            "bg-muted hover:bg-muted"
                        )}
                      >
                        <TableCell>
                          <div className="font-medium">
                            {sub.first_name} {sub.last_name}
                          </div>
                          <div className="text-sm text-muted-foreground hidden sm:inline">
                            {sub.email}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(sub.submitted_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => setSelectedSubmission(sub)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDelete(sub.id)}
                                className="text-red-500 focus:text-red-500"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="h-48 text-center text-muted-foreground"
                      >
                        <Inbox className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold">
                          No submissions
                        </h3>
                        <p>New contact form submissions will appear here.</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            {!loading && (
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>{submissions.length}</strong> submissions
                </div>
              </CardFooter>
            )}
          </Card>
        </div>

        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle>Submission Details</CardTitle>
            {!selectedSubmission && (
              <CardDescription>
                Select a submission to see its details.
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedSubmission ? (
              <div className="space-y-4">
                <InfoRow
                  icon={<User size={16} />}
                  label="Full Name"
                  value={`${selectedSubmission.first_name} ${
                    selectedSubmission.last_name || ""
                  }`}
                />
                <InfoRow
                  icon={<Mail size={16} />}
                  label="Email"
                  value={selectedSubmission.email}
                />
                <InfoRow
                  icon={<Phone size={16} />}
                  label="Phone"
                  value={selectedSubmission.phone}
                />
                <InfoRow
                  icon={<Calendar size={16} />}
                  label="Received On"
                  value={new Date(
                    selectedSubmission.submitted_at
                  ).toLocaleString()}
                />
                <InfoRow
                  icon={<Package size={16} />}
                  label="Product Details"
                  value={selectedSubmission.product_details}
                />
                <InfoRow
                  icon={<MessageSquare size={16} />}
                  label="Message"
                  value={selectedSubmission.message}
                />
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12 flex flex-col items-center justify-center h-full">
                <MessageSquare className="h-12 w-12 mb-4" />
                <p className="font-semibold">No submission selected</p>
                <p className="text-sm">
                  Click on a submission from the list to see details.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
