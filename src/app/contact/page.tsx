"use client";

import type React from "react";

import { useState,useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Award,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      newErrors.firstName = "First name can only contain letters";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last name can only contain letters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-$$$$]/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.trim().length > 500) {
      newErrors.message = "Message must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };


  useEffect(() => {
    // Scroll down 100vh after 3 seconds
    const timer = setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight*1.2,
        behavior: 'smooth'
      });
     
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#3A5A40]/5 via-white to-[#AE8F65]/5 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center shadow-2xl border-0 bg-white">
          <CardContent className="p-12 space-y-6">
            <div className="w-20 h-20 bg-[#3A5A40]/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-[#3A5A40]" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-[#3A5A40]">
                Message Sent Successfully!
              </h2>
              <p className="text-gray-600 text-lg">
                Thank you for reaching out. We&apos;ll get back to you within 24
                hours.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3A5A40]/5 via-white to-[#AE8F65]/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#3A5A40] via-[#3A5A40]/95 to-[#3A5A40]/90">
        <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23AE8F65" fillOpacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-30'></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-[#AE8F65]/20 text-[#AE8F65] border-[#AE8F65]/30 px-4 py-2 text-sm font-medium">
                Get In Touch
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Contact
                <span className="block text-[#AE8F65]">Our Team</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Ready to find the perfect gift? Let&apos;s discuss your
              gifting needs and create something extraordinary together.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#AE8F65]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-[#AE8F65]" />
                </div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-white/70 text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#AE8F65]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-[#AE8F65]" />
                </div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-white/70 text-sm">Products Catalog</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#AE8F65]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-[#AE8F65]" />
                </div>
                <div className="text-3xl font-bold text-white">10+</div>
                <div className="text-white/70 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#AE8F65]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-[#AE8F65]" />
                </div>
                <div className="text-3xl font-bold text-white">24h</div>
                <div className="text-white/70 text-sm">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl lg:text-5xl font-bold text-[#3A5A40] mb-4">
                  Let&apos;s Start a Conversation
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Fill out the form below with your Query, and
                  we&apos;ll get back to you with a personalized solution.
                </p>
              </div>

              <Card className="shadow-2xl border-0 bg-white overflow-hidden pt-0">
                <CardHeader className="bg-gradient-to-r from-[#3A5A40]/5 to-[#AE8F65]/5 p-8">
                  <CardTitle className="text-2xl text-[#3A5A40] text-center">
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 lg:p-12">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name Fields */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label
                          htmlFor="firstName"
                          className="text-sm font-semibold text-[#3A5A40] flex items-center gap-2"
                        >
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          autoFocus
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className={`h-14 text-lg ${
                            errors.firstName
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-200 focus:border-[#3A5A40]"
                          } transition-all duration-200`}
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <div className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.firstName}
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label
                          htmlFor="lastName"
                          className="text-sm font-semibold text-[#3A5A40]"
                        >
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className={`h-14 text-lg ${
                            errors.lastName
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-200 focus:border-[#3A5A40]"
                          } transition-all duration-200`}
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <div className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label
                          htmlFor="email"
                          className="text-sm font-semibold text-[#3A5A40]"
                        >
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={`h-14 text-lg ${
                            errors.email
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-200 focus:border-[#3A5A40]"
                          } transition-all duration-200`}
                          placeholder="john.doe@example.com"
                        />
                        {errors.email && (
                          <div className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label
                          htmlFor="phone"
                          className="text-sm font-semibold text-[#3A5A40]"
                        >
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className={`h-14 text-lg ${
                            errors.phone
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-200 focus:border-[#3A5A40]"
                          } transition-all duration-200`}
                          placeholder="+1 (555) 123-4567"
                        />
                        {errors.phone && (
                          <div className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.phone}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="message"
                        className="text-sm font-semibold text-[#3A5A40]"
                      >
                        Gift Details *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        className={`min-h-40 text-lg resize-none ${
                          errors.message
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 focus:border-[#3A5A40]"
                        } transition-all duration-200`}
                        placeholder="Tell us about your gift choice, budget, and any specific requirements..."
                      />
                      <div className="flex justify-between items-center">
                        {errors.message ? (
                          <div className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.message}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">
                            Minimum 10 characters required
                          </div>
                        )}
                        <span
                          className={`text-sm ${
                            formData.message.length > 450
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {formData.message.length}/500
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 bg-gradient-to-r from-[#3A5A40] to-[#3A5A40]/90 hover:from-[#3A5A40]/90 hover:to-[#3A5A40]/80 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending Message...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send className="w-6 h-6" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar - Takes 1 column */}
            <div className="space-y-8">
              {/* Contact Information Card */}
              <Card className="shadow-2xl border-0 bg-white overflow-hidden py-0">
                <CardHeader className="bg-gradient-to-r from-[#AE8F65]/10 to-[#AE8F65]/5 p-6">
                  <CardTitle className="text-2xl text-[#3A5A40]">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[#3A5A40]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-7 h-7 text-[#3A5A40]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-[#3A5A40] text-lg">
                          Email Address
                        </h4>
                        <p className="text-gray-600">kevesiya@gmail.com</p>
                        <p className="text-sm text-gray-500">
                          We respond within 2 hours
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-gray-100" />

                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[#3A5A40]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-7 h-7 text-[#3A5A40]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-[#3A5A40] text-lg">
                          Phone Number
                        </h4>
                        <p className="text-gray-600">+91 9220229789</p>
                        <p className="text-sm text-gray-500">
                          Available 9 AM - 6 PM IST
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-gray-100" />

                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[#3A5A40]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-7 h-7 text-[#3A5A40]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-[#3A5A40] text-lg">
                          Office Address
                        </h4>
                        <div className="text-gray-600 space-y-1">
                          <p>52 North Avenue Road</p>
                          <p>West Punjabi Bagh</p>
                          <p>New Delhi 110026, India</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours Card */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-[#3A5A40] to-[#3A5A40]/90 text-white overflow-hidden ">
                <CardHeader className="p-">
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <Clock className="w-6 h-6" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/80">Monday - Friday</span>
                      <Badge className="bg-[#AE8F65] text-white border-0">
                        9:00 AM - 6:00 PM
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/80">Saturday</span>
                      <Badge className="bg-[#AE8F65]/80 text-white border-0">
                        10:00 AM - 4:00 PM
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/80">Sunday</span>
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white border-0"
                      >
                        Closed
                      </Badge>
                    </div>
                  </div>
                  <Separator className="bg-white/20 my-6" />
                  <div className="text-center">
                    <p className="text-white/80 text-sm">
                      Need urgent assistance?
                    </p>
                    <p className="text-[#AE8F65] font-semibold">
                      Call us for emergency support
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-r from-[#3A5A40]/5 to-[#AE8F65]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-[#3A5A40] mb-4">
              Find Our Office
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Visit us at our office in New Delhi or schedule a virtual meeting
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-whit overflow-hidden py-0">
            <CardContent className="p-0">
              <div className="relative h-96 bg-gradient-to-br from-[#3A5A40]/10 to-[#AE8F65]/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.562977189838!2d77.12609107529067!3d28.672801375642848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d031290a1aa77%3A0x444d63f308de1f5b!2sKevasiya!5e0!3m2!1sen!2sin!4v1750769709987!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  loading="lazy"
                  className="w-full h-full absolute top-0 left-0 -z-1"
                ></iframe>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-[#3A5A40]/10 rounded-full flex items-center justify-center mx-auto">
                      <MapPin className="w-10 h-10 text-[#3A5A40]" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-2xl font-bold text-[#3A5A40]">
                        Interactive Map
                      </h4>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Click below to view our exact location and get
                        directions via Google Maps
                      </p>
                    </div>
                    <a
                      href="https://maps.app.goo.gl/KvrAG625XLWk3eCC9"
                      target="_blank"
                    >
                      <Button
                        size="lg"
                        className="bg-[#3A5A40] hover:bg-[#3A5A40]/90 text-white shadow-lg hover:cursor-pointer relative z-10"
                      >
                        <MapPin className="w-5 h-5 mr-2" />
                        Open in Google Maps
                      </Button>
                    </a>
                  </div>
                </div>
                {/* Decorative map-like elements */}
                <div className="absolute inset-0 z-0 opacity-20">
                  <div className="absolute top-8 left-8 w-3 h-3 bg-[#3A5A40] rounded-full"></div>
                  <div className="absolute top-12 right-12 w-2 h-2 bg-[#AE8F65] rounded-full"></div>
                  <div className="absolute bottom-16 left-16 w-4 h-4 bg-[#3A5A40] rounded-full"></div>
                  <div className="absolute bottom-8 right-8 w-3 h-3 bg-[#AE8F65] rounded-full"></div>
                  <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-[#3A5A40] rounded-full"></div>
                  <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#AE8F65] rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Media & CTA Section */}
      <section className="bg-gradient-to-r from-[#3A5A40] via-[#3A5A40]/95 to-[#3A5A40]/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <h3 className="text-4xl lg:text-5xl font-bold">Stay Connected</h3>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Follow us on social media for the latest updates, Gift
                showcases, and industry insights
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-[#AE8F65]/50 text-white hover:bg-[#AE8F65]/20 hover:border-[#AE8F65] transition-all duration-300 px-8 py-4 text-lg hover:cursor-pointer"
                onClick={() =>
                  window.open("https://www.facebook.com/kevasiya", "_blank")
                }
              >
                Facebook
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-[#AE8F65]/50 text-white hover:bg-[#AE8F65]/20 hover:border-[#AE8F65] transition-all duration-300 px-8 py-4 text-lg hover:cursor-pointer"
                onClick={() => window.open("https://linkedin.com", "_blank")}
              >
                LinkedIn
              </Button> */}
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-[#AE8F65]/50 text-white hover:bg-[#AE8F65]/20 hover:border-[#AE8F65] transition-all duration-300 px-8 py-4 text-lg hover:cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/kevasiya.in/",
                    "_blank"
                  )
                }
              >
                Instagram
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
