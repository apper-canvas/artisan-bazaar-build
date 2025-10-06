import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import FileUpload from "@/components/molecules/FileUpload";
import Card from "@/components/atoms/Card";
import { toast } from "react-toastify";

const SellerRegistrationPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    businessAddress: "",
    businessDescription: "",
    taxId: "",
    bankAccountNumber: "",
    bankRoutingNumber: ""
  });

  const [businessDocuments, setBusinessDocuments] = useState([]);
  const [identityDocuments, setIdentityDocuments] = useState([]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = "Business email is required";
    }
    if (!formData.businessPhone.trim()) {
      newErrors.businessPhone = "Business phone is required";
    }
    if (!formData.taxId.trim()) {
      newErrors.taxId = "Tax ID is required";
    }
    if (businessDocuments.length === 0) {
      newErrors.businessDocuments = "Please upload at least one business document";
    }
    if (identityDocuments.length === 0) {
      newErrors.identityDocuments = "Please upload at least one identity document";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Registration submitted successfully! We'll review your application.");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface/30 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Become a Seller
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join our marketplace and start selling your unique products to customers worldwide
          </p>
        </motion.div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Information */}
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ApperIcon name="Store" className="w-6 h-6 text-primary" />
                Business Information
              </h2>
              
              <div className="space-y-4">
                <Input
                  label="Business Name"
                  required
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  error={errors.businessName}
                  placeholder="Your business or brand name"
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Business Email"
                    type="email"
                    required
                    value={formData.businessEmail}
                    onChange={(e) => handleInputChange("businessEmail", e.target.value)}
                    error={errors.businessEmail}
                    placeholder="contact@yourbusiness.com"
                  />
                  
                  <Input
                    label="Business Phone"
                    type="tel"
                    required
                    value={formData.businessPhone}
                    onChange={(e) => handleInputChange("businessPhone", e.target.value)}
                    error={errors.businessPhone}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <Input
                  label="Business Address"
                  value={formData.businessAddress}
                  onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                  placeholder="123 Main St, City, State, ZIP"
                />
                
                <TextArea
                  label="Business Description"
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                  placeholder="Tell us about your business, products, and what makes you unique..."
                  rows={4}
                />
              </div>
            </div>

            {/* Tax & Banking */}
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ApperIcon name="CreditCard" className="w-6 h-6 text-primary" />
                Tax & Banking Information
              </h2>
              
              <div className="space-y-4">
                <Input
                  label="Tax ID / EIN"
                  required
                  value={formData.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                  error={errors.taxId}
                  placeholder="XX-XXXXXXX"
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Bank Account Number"
                    value={formData.bankAccountNumber}
                    onChange={(e) => handleInputChange("bankAccountNumber", e.target.value)}
                    placeholder="Account number for payouts"
                  />
                  
                  <Input
                    label="Bank Routing Number"
                    value={formData.bankRoutingNumber}
                    onChange={(e) => handleInputChange("bankRoutingNumber", e.target.value)}
                    placeholder="9-digit routing number"
                  />
                </div>
              </div>
            </div>

            {/* Document Uploads */}
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ApperIcon name="FileText" className="w-6 h-6 text-primary" />
                Required Documents
              </h2>
              
              <div className="space-y-6">
                <FileUpload
                  label="Business Documents"
                  maxSize={10}
                  maxFiles={3}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onFilesChange={setBusinessDocuments}
                  error={errors.businessDocuments}
                  helperText="Upload business license, registration, or other official documents (PDF or images)"
                />
                
                <FileUpload
                  label="Identity Verification"
                  maxSize={10}
                  maxFiles={2}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onFilesChange={setIdentityDocuments}
                  error={errors.identityDocuments}
                  helperText="Upload government-issued ID (driver's license, passport, etc.)"
                />
              </div>
            </div>

            {/* Terms & Submit */}
            <div className="bg-surface rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <ApperIcon name="Info" className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-2">Before you submit:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Your application will be reviewed within 3-5 business days</li>
                    <li>We'll contact you via email if additional information is needed</li>
                    <li>Platform fee is 10% per transaction</li>
                    <li>You'll have access to seller dashboard upon approval</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="accent"
                className="flex-1"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
                {!loading && <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SellerRegistrationPage;