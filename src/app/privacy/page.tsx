'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Shield, Eye, Lock, Database, Cookie } from 'lucide-react';
import Link from 'next/link';

export default function Privacy() {
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
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌙</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Arabizi
                </h1>
                <p className="text-sm text-gray-600">Professional Arabic Keyboard</p>
              </div>
            </div>
            
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to App
              </Button>
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
              <Shield className="h-12 w-12 text-indigo-500" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we protect and handle your data.
            </p>
          </div>

          {/* Privacy Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Privacy Protection
              </CardTitle>
              <CardDescription>
                Last updated: January 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Database className="h-5 w-5 text-indigo-500" />
                  1. Information We Collect
                </h3>
                <div className="text-gray-700 leading-relaxed space-y-3">
                  <p>
                    Arabizi is designed with privacy in mind. We collect minimal information to provide our service:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Text Input:</strong> The text you type is processed in real-time for transliteration but is not stored on our servers</li>
                    <li><strong>Usage Analytics:</strong> Anonymous usage statistics to improve our service (no personal data)</li>
                    <li><strong>Browser Data:</strong> Copy history and preferences are stored locally in your browser only</li>
                    <li><strong>Technical Data:</strong> Basic technical information like browser type and IP address for security purposes</li>
                  </ul>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-indigo-500" />
                  2. How We Use Your Information
                </h3>
                <div className="text-gray-700 leading-relaxed space-y-3">
                  <p>
                    We use the collected information solely to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide real-time Arabic transliteration services</li>
                    <li>Improve the accuracy of our translation algorithms</li>
                    <li>Maintain and improve the performance of our service</li>
                    <li>Ensure the security and integrity of our platform</li>
                    <li>Analyze usage patterns to enhance user experience</li>
                  </ul>
                  <p className="font-semibold text-indigo-700">
                    We never sell, rent, or share your personal data with third parties for marketing purposes.
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">3. Data Storage and Security</h3>
                <div className="text-gray-700 leading-relaxed space-y-3">
                  <p>
                    Your privacy and data security are our top priorities:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>No Text Storage:</strong> Your typed text is processed in real-time and not stored on our servers</li>
                    <li><strong>Local Storage:</strong> Copy history and preferences are stored locally in your browser</li>
                    <li><strong>Encryption:</strong> All data transmission is encrypted using HTTPS/SSL</li>
                    <li><strong>No Registration:</strong> No personal accounts or registration required</li>
                    <li><strong>Automatic Deletion:</strong> Any temporary processing data is automatically deleted</li>
                  </ul>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Cookie className="h-5 w-5 text-indigo-500" />
                  4. Cookies and Local Storage
                </h3>
                <div className="text-gray-700 leading-relaxed space-y-3">
                  <p>
                    We use minimal cookies and local storage to enhance your experience:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Essential Cookies:</strong> Required for basic functionality (cannot be disabled)</li>
                    <li><strong>Preference Cookies:</strong> Remember your font and size settings</li>
                    <li><strong>Local Storage:</strong> Store your copy history locally in your browser</li>
                    <li><strong>No Tracking:</strong> We don't use tracking cookies or third-party analytics that identify you</li>
                  </ul>
                  <p>
                    You can clear your browser's local storage at any time to remove all stored preferences and history.
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">5. Third-Party Services</h3>
                <div className="text-gray-700 leading-relaxed space-y-3">
                  <p>
                    We use the following third-party services to provide our functionality:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Yamli API:</strong> For Arabic transliteration services (text is processed but not stored)</li>
                    <li><strong>CDN Services:</strong> For fast content delivery (no personal data shared)</li>
                    <li><strong>Hosting Provider:</strong> For reliable service hosting (standard security measures)</li>
                  </ul>
                  <p>
                    These services are bound by their own privacy policies and security standards.
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">6. Your Rights and Control</h3>
                <div className="text-gray-700 leading-relaxed space-y-3">
                  <p>
                    You have full control over your data:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Access:</strong> Since we don't store personal data, there's nothing to access</li>
                    <li><strong>Deletion:</strong> Clear your browser's local storage to remove all local data</li>
                    <li><strong>Portability:</strong> Export your copy history from your browser if needed</li>
                    <li><strong>Opt-out:</strong> Simply stop using the service - no data remains</li>
                  </ul>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">7. Children's Privacy</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our service is safe for users of all ages. We don't knowingly collect personal information from children under 13. 
                  Since we don't require registration or store personal data, children can use our service safely under parental guidance.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">8. Changes to This Policy</h3>
                <p className="text-gray-700 leading-relaxed">
                  We may update this privacy policy from time to time. Any changes will be posted on this page with an updated 
                  revision date. We encourage you to review this policy periodically to stay informed about how we protect your privacy.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">9. Contact Us</h3>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us through our website. 
                  We're committed to addressing your privacy concerns promptly and transparently.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="text-center bg-green-50 border-green-200">
              <CardContent className="p-4">
                <Lock className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900">No Data Storage</h3>
                <p className="text-sm text-green-700">Your text is processed in real-time and never stored</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900">Local Storage Only</h3>
                <p className="text-sm text-blue-700">History and preferences stay in your browser</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <Eye className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900">No Tracking</h3>
                <p className="text-sm text-purple-700">We don't track or profile users</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <Card className="bg-indigo-50 border-indigo-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">Questions about Privacy?</h3>
              <p className="text-indigo-700 mb-4">
                We're committed to transparency and protecting your privacy. Contact us with any concerns.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/">
                  <Button variant="outline">
                    Back to App
                  </Button>
                </Link>
                <Link href="/terms">
                  <Button variant="default">
                    Terms of Service
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t bg-white/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>© 2025 Arabizi - Professional Arabic Keyboard Online</p>
            <p className="text-sm mt-2">Smart Arabic transliterator with AI suggestions • No download required</p>
            <p className="text-xs mt-2 text-gray-500">Version 1.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 