import React from 'react'
import { Clock, Mail, CheckCircle } from 'lucide-react'

const PendingApproval = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-8 text-center">
          <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
            <Clock className="h-10 w-10 text-yellow-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Registration Submitted!</h2>
          <p className="text-gray-400 mb-6">
            Your academy registration has been received and is pending admin approval.
          </p>
          
          <div className="bg-[#0f172a] rounded-lg p-4 mb-6 text-left">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-[#22d3ee] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-300">
                <p className="font-medium text-white mb-1">What's next?</p>
                <ul className="space-y-2">
                  <li>• Our team will review your application within 1-3 business days</li>
                  <li>• You'll receive an email notification once approved</li>
                  <li>• After approval, you can log in and start managing your academy</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6">
            <Mail className="h-4 w-4" />
            <span>Check your email for updates</span>
          </div>
          
          <a
            href="/"
            className="block w-full py-3 bg-[#22d3ee] hover:bg-[#1e40af] text-[#0f172a] hover:text-white font-semibold rounded-lg transition text-center"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

export default PendingApproval