import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { toast } from "sonner";
import { ref, push } from "firebase/database";
import { database } from "@/lib/firebase";

interface EnrollmentData {
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
}

const EnrollmentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EnrollmentData>({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    childName: "",
    childAge: "",
    program: "",
    startDate: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalInfo: "",
    additionalNotes: "",
  });

  const handleInputChange = (field: keyof EnrollmentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      const requiredFields = ['parentName', 'parentEmail', 'parentPhone', 'childName', 'childAge', 'program', 'startDate'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof EnrollmentData]);
      
      if (missingFields.length > 0) {
        toast.error("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      // Submit to Firebase
      const enrollmentsRef = ref(database, 'enrollments');
      await push(enrollmentsRef, {
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      });

      toast.success("🎉 Enrollment application submitted successfully! We'll contact you soon.");
      
      // Reset form and close modal
      setFormData({
        parentName: "",
        parentEmail: "",
        parentPhone: "",
        childName: "",
        childAge: "",
        program: "",
        startDate: "",
        emergencyContact: "",
        emergencyPhone: "",
        medicalInfo: "",
        additionalNotes: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting enrollment:", error);
      toast.error("Failed to submit enrollment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="glass-button text-lg px-8 py-6 rounded-2xl font-semibold bg-gradient-to-r from-fun-yellow to-fun-orange text-white border-0 hover:scale-105 transition-transform shadow-lg"
        >
          🎒 Enroll Now
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-primary">
            Enroll Your Child 🌟
          </DialogTitle>
          <DialogDescription>
            Fill out this form to enroll your child in Crystal Play School. We'll contact you within 24 hours!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Parent Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Parent Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentName">Parent Name *</Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => handleInputChange('parentName', e.target.value)}
                  placeholder="Enter parent's full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="parentEmail">Email Address *</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                  placeholder="parent@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="parentPhone">Phone Number *</Label>
              <Input
                id="parentPhone"
                value={formData.parentPhone}
                onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
          </div>

          {/* Child Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Child Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="childName">Child's Name *</Label>
                <Input
                  id="childName"
                  value={formData.childName}
                  onChange={(e) => handleInputChange('childName', e.target.value)}
                  placeholder="Enter child's full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="childAge">Child's Age *</Label>
                <Select value={formData.childAge} onValueChange={(value) => handleInputChange('childAge', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 years</SelectItem>
                    <SelectItem value="3">3 years</SelectItem>
                    <SelectItem value="4">4 years</SelectItem>
                    <SelectItem value="5">5 years</SelectItem>
                    <SelectItem value="6">6 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="program">Program *</Label>
                <Select value={formData.program} onValueChange={(value) => handleInputChange('program', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preschool">Preschool (2-3 years)</SelectItem>
                    <SelectItem value="prekindergarten">Pre-Kindergarten (4-5 years)</SelectItem>
                    <SelectItem value="afterschool">After School Care</SelectItem>
                    <SelectItem value="summer">Summer Camp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="startDate">Preferred Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Emergency Contact</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder="Emergency contact name"
                />
              </div>
              
              <div>
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Additional Information</h3>
            
            <div>
              <Label htmlFor="medicalInfo">Medical Information / Allergies</Label>
              <Textarea
                id="medicalInfo"
                value={formData.medicalInfo}
                onChange={(e) => handleInputChange('medicalInfo', e.target.value)}
                placeholder="Please list any allergies, medical conditions, or special needs..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                placeholder="Any additional information you'd like us to know..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary to-fun-purple text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit Enrollment 🎒"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentModal;