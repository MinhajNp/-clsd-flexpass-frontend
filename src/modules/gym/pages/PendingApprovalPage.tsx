import { Clock, ExternalLink } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const PendingApprovalPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 flex items-center justify-center rounded-full bg-teal-50">
                        <Clock className="h-10 w-10 text-teal-600 animate-pulse" />
                    </div>
                </div>
                
                <h1 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Application Under Review
                </h1>
                
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Great things take time! Our team is currently reviewing your gym's application. 
                    You'll receive an email once your workspace is ready.
                </p>

                <div className="space-y-4">
                    <Button 
                        id="back-to-home"
                        label="Back to Homepage"
                        onClick={() => navigate("/")}
                        variant="primary"
                        fullWidth
                    />
                    
                    <a 
                        href="mailto:support@flexpass.com"
                        className="flex items-center justify-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                    >
                        Contact Support
                        <ExternalLink className="h-4 w-4" />
                    </a>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                        Average review time: 1-2 business days.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PendingApprovalPage;
