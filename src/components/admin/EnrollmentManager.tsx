import { useState, useEffect } from "react";
import { ref, onValue, update, remove } from "firebase/database";
import { database } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Eye, Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Enrollment {
  id: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childAge: string;
  program: string;
  startDate: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalInfo: string;
  additionalNotes: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

const EnrollmentManager = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    const enrollmentsRef = ref(database, 'enrollments');
    
    const unsubscribe = onValue(enrollmentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const enrollmentsList: Enrollment[] = Object.entries(data).map(([id, enrollment]) => ({
          id,
          ...(enrollment as Omit<Enrollment, 'id'>)
        }));
        
        // Sort by submission date (newest first)
        enrollmentsList.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
        setEnrollments(enrollmentsList);
      } else {
        setEnrollments([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateEnrollmentStatus = async (enrollmentId: string, status: 'approved' | 'rejected') => {
    try {
      const enrollmentRef = ref(database, `enrollments/${enrollmentId}`);
      await update(enrollmentRef, { status });
      toast.success(`Enrollment ${status} successfully`);
    } catch (error) {
      console.error("Error updating enrollment status:", error);
      toast.error("Failed to update enrollment status");
    }
  };

  const deleteEnrollment = async (enrollmentId: string) => {
    try {
      const enrollmentRef = ref(database, `enrollments/${enrollmentId}`);
      await remove(enrollmentRef);
      toast.success("Enrollment deleted successfully");
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      toast.error("Failed to delete enrollment");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Enrollment Applications</CardTitle>
        <CardDescription>
          Manage enrollment applications from parents
        </CardDescription>
      </CardHeader>
      <CardContent>
        {enrollments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No enrollment applications yet.
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Child Name</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">
                      {enrollment.childName}
                      <div className="text-sm text-muted-foreground">
                        Age: {enrollment.childAge} years
                      </div>
                    </TableCell>
                    <TableCell>
                      {enrollment.parentName}
                      <div className="text-sm text-muted-foreground">
                        {enrollment.parentEmail}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">
                      {enrollment.program}
                      <div className="text-sm text-muted-foreground">
                        Start: {new Date(enrollment.startDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDate(enrollment.submittedAt)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(enrollment.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedEnrollment(enrollment)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Enrollment Details</DialogTitle>
                              <DialogDescription>
                                Complete application information
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedEnrollment && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold text-primary">Parent Information</h4>
                                    <p><strong>Name:</strong> {selectedEnrollment.parentName}</p>
                                    <p><strong>Email:</strong> {selectedEnrollment.parentEmail}</p>
                                    <p><strong>Phone:</strong> {selectedEnrollment.parentPhone}</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-semibold text-primary">Child Information</h4>
                                    <p><strong>Name:</strong> {selectedEnrollment.childName}</p>
                                    <p><strong>Age:</strong> {selectedEnrollment.childAge} years</p>
                                    <p><strong>Program:</strong> {selectedEnrollment.program}</p>
                                    <p><strong>Start Date:</strong> {new Date(selectedEnrollment.startDate).toLocaleDateString()}</p>
                                  </div>
                                </div>
                                
                                {(selectedEnrollment.emergencyContact || selectedEnrollment.emergencyPhone) && (
                                  <div>
                                    <h4 className="font-semibold text-primary">Emergency Contact</h4>
                                    <p><strong>Name:</strong> {selectedEnrollment.emergencyContact || 'Not provided'}</p>
                                    <p><strong>Phone:</strong> {selectedEnrollment.emergencyPhone || 'Not provided'}</p>
                                  </div>
                                )}
                                
                                {selectedEnrollment.medicalInfo && (
                                  <div>
                                    <h4 className="font-semibold text-primary">Medical Information</h4>
                                    <p className="bg-muted p-3 rounded">{selectedEnrollment.medicalInfo}</p>
                                  </div>
                                )}
                                
                                {selectedEnrollment.additionalNotes && (
                                  <div>
                                    <h4 className="font-semibold text-primary">Additional Notes</h4>
                                    <p className="bg-muted p-3 rounded">{selectedEnrollment.additionalNotes}</p>
                                  </div>
                                )}
                                
                                <div className="flex gap-4 justify-end">
                                  <Select
                                    value={selectedEnrollment.status}
                                    onValueChange={(value: 'pending' | 'approved' | 'rejected') => {
                                      if (value !== 'pending') {
                                        updateEnrollmentStatus(selectedEnrollment.id, value);
                                      }
                                    }}
                                  >
                                    <SelectTrigger className="w-32">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="approved">Approved</SelectItem>
                                      <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        {enrollment.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateEnrollmentStatus(enrollment.id, 'approved')}
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateEnrollmentStatus(enrollment.id, 'rejected')}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteEnrollment(enrollment.id)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnrollmentManager;