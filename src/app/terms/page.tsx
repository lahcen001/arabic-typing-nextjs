'use client';

// Removed unused imports
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Scale, Shield, Users, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
      {/* Header */}
      <header className="border-b border-white/20 bg-white/10 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                <span className="text-white font-bold text-lg">🌙</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                  Arabizi
                </h1>
                <p className="text-sm text-white/80">Professional Arabic Keyboard</p>
              </div>
            </div>
            
            <Link href="/">
              <button className="glass rounded-lg px-4 py-2 text-white/90 hover:bg-white/20 transition-all duration-200 flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to App
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Scale className="h-12 w-12 text-yellow-600 drop-shadow-lg" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4 drop-shadow-lg">
              Terms of Service
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto drop-shadow-md">
              Please read these terms carefully before using our Arabic typing service.
            </p>
          </div>

          {/* Terms Content */}
          <div className="glass rounded-3xl mb-8 overflow-hidden">
            <div className="p-6 border-b border-white/20">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Service Agreement
              </h3>
              <p className="text-gray-600">
                Last updated: January 2025
              </p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
                  <Users className="h-5 w-5 text-green-600" />
                  1. Acceptance of Terms
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using the Arabizi Arabic Keyboard service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
                  <Globe className="h-5 w-5 text-indigo-600" />
                  2. Use License
                </h3>
                <div className="text-gray-700 leading-relaxed space-y-3">
                  <p>
                    Permission is granted to temporarily download one copy of the materials on Arabizi's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                    <li>attempt to decompile or reverse engineer any software contained on the website</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                  <p>
                    This license shall automatically terminate if you violate any of these restrictions and may be terminated by Arabizi at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">3. Disclaimer</h3>
                <p className="text-gray-700 leading-relaxed">
                  The materials on Arabizi's website are provided on an 'as is' basis. Arabizi makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">4. Limitations</h3>
                <p className="text-gray-700 leading-relaxed">
                  In no event shall Arabizi or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Arabizi's website, even if Arabizi or an authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">5. Accuracy of Materials</h3>
                <p className="text-gray-700 leading-relaxed">
                  The materials appearing on Arabizi's website could include technical, typographical, or photographic errors. Arabizi does not warrant that any of the materials on its website are accurate, complete, or current. Arabizi may make changes to the materials contained on its website at any time without notice. However, Arabizi does not make any commitment to update the materials.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">6. Links</h3>
                <p className="text-gray-700 leading-relaxed">
                  Arabizi has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Arabizi of the site. Use of any such linked website is at the user's own risk.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">7. Modifications</h3>
                <p className="text-gray-700 leading-relaxed">
                  Arabizi may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">8. Governing Law</h3>
                <p className="text-gray-700 leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Arabizi operates and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="glass rounded-3xl">
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Questions about our Terms?</h3>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/">
                  <button className="glass rounded-lg px-4 py-2 text-white/90 hover:bg-white/20 transition-all duration-200">
                    Back to App
                  </button>
                </Link>
                <Link href="/privacy">
                  <button className="glass rounded-lg px-4 py-2 text-white/90 hover:bg-white/20 transition-all duration-200">
                    Privacy Policy
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white/80">
            <p>© 2025 Arabizi - Professional Arabic Keyboard Online</p>
            <p className="text-sm mt-2">Smart Arabic transliterator with AI suggestions • No download required</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 