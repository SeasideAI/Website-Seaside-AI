import React, { useState } from 'react';
import { ArrowLeft, Send, Building2, Mail, Phone, User, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

const services = [
  "AI Chat Assistant",
  "AI Voice Agent",
  "Strategic Consultancy",
  "Workflow Automation",
  "AI Website Development",
  "Other"
] as const;

type Service = typeof services[number];

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: Service;
  companyName: string;
  problems: string;
  additionalInfo: string;
}

const WEBHOOK_URL = 'https://hook.eu2.make.com/cvw9ncjyyyyo1qlhepbnkuj61muq1kx5';

export default function ContactForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: services[0],
    companyName: '',
    problems: '',
    additionalInfo: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, submit to Supabase
      const { error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            company_name: formData.companyName,
            problems: formData.problems,
            additional_info: formData.additionalInfo || null
          }
        ]);

      if (supabaseError) throw supabaseError;

      // If Supabase submission succeeds, try the webhook
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            companyName: formData.companyName,
            problems: formData.problems,
            additionalInfo: formData.additionalInfo,
            submittedAt: new Date().toISOString()
          })
        });
      } catch (webhookError) {
        // Log webhook error but don't fail the submission
        console.error('Webhook notification failed:', webhookError);
      }

      // Show success message and reset form
      toast.success('Thank you for your submission! We will contact you soon.');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: services[0],
        companyName: '',
        problems: '',
        additionalInfo: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-8 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-gray-100">
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Form</h2>
              <p className="text-gray-600">Fill out the form below and we will get back to you for a free intake call</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                    Name *
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="pl-10 w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="pl-10 w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      pattern="[0-9+\-\s]+"
                      className="pl-10 w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      required
                      className="pl-10 w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                      value={formData.companyName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                  What can we help you with? *
                </label>
                <div className="relative">
                  <ChevronRight size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select
                    name="service"
                    id="service"
                    required
                    className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all appearance-none pr-10 pl-4"
                    value={formData.service}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  >
                    {services.map(service => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="problems" className="block text-sm font-medium text-gray-700 mb-2">
                  Context about your inquiry
                </label>
                <textarea
                  name="problems"
                  id="problems"
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all p-4"
                  value={formData.problems}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  id="additionalInfo"
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all p-4"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-medium rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send
                      <Send size={20} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}